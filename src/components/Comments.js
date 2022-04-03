import {useEffect, useState} from "react";
import {View} from "react-native-web";
import {PADDING_BOTTOM, PADDING_LEFT, PADDING_RIGHT, PADDING_TOP, SERVER_ADDR} from "./Utilities";
import InnerText from "./InnerText";
import {Button, TextField} from "@mui/material";
import { useSSE } from 'react-hooks-sse';
import Comment from "./Comment";

export default function Comments(props) {
    const comment_sse = useSSE('comment_added');
    const like_sse = useSSE('comment_liked');
    const change_question_sse = useSSE('change_question');
    const [question, setQuestion] = useState(props.question);
    const [qid, setQid] = useState(props.qid);
    const [comments, setComments] = useState([]);
    const [answer, setAnswer] = useState("");

    const handleChange = (event) => {
        setAnswer(event.target.value);
    };

    useEffect(() => {
        if (comment_sse) {
            console.log("Receiving new comment: ", comment_sse);
            setComments([...comments, comment_sse]);
        }
    }, [comment_sse])

    useEffect(() => {
        if (like_sse) {
            console.log("Receiving like: ", like_sse);
            let added = false;
            for (let i = 0; i < comments.length; i++) {
                if (comments[i].id === like_sse.id) {
                    comments[i] = like_sse;
                    added = true;
                }
            }
            if (!added) {
                comments.push(like_sse);
            }
            let newComments = [...comments];
            newComments.sort((comment1, comment2) => comment1.like_count < comment2.like_count);
            setComments(newComments);
        }
    }, [like_sse])

    useEffect(() => {
        if (change_question_sse) {
            console.log("Change question sse received: ", change_question_sse);
            setQid(change_question_sse.id);
            setQuestion(change_question_sse.question);
        }
    }, [change_question_sse])
    
    useEffect( async () => {
        console.log(`Fetching initial comments wit qid=${qid}...`);
        const tempComments = await fetch(`${SERVER_ADDR}/get_comments?qid=${encodeURIComponent(qid)}`) // Florent : 10.30.68.78 - Thomas : 10.30.68.74
            .then(response => response.json())
            .then(data => data);

        console.log(tempComments);
        setComments(tempComments);
    }, [qid]);

    const addComment = () => {
        console.log("Adding comment")
        console.log(props)
        fetch(`${SERVER_ADDR}/add_comment?qid=${encodeURIComponent(qid)}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({author_id: props.user_id, comment: answer})
        })
    }
    
    return (
        <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: PADDING_TOP,
            paddingBottom: PADDING_BOTTOM
        }}>
            <InnerText>{question}</InnerText>
            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: PADDING_TOP,
                paddingBottom: PADDING_BOTTOM,
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <TextField id="answer" label="Enter an answer" variant="standard" onChange={handleChange} style={{
                        width: '100%',
                        marginLeft: PADDING_LEFT,
                        marginTop: PADDING_TOP,
                    }}/>
                    <Button variant="contained" color="primary" onClick={() => addComment()}> + </Button>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: 1
                }}>
                    {comments.map((comment, index) => {
                        return (
                            <Comment key={comment.id} qid={qid} id={comment.id} comment={comment.comment} count={comment.like_count}/>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}
