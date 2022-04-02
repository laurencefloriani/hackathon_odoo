import {useEffect, useState} from "react";
import {View} from "react-native-web";
import {PADDING_BOTTOM, PADDING_LEFT, PADDING_RIGHT, PADDING_TOP} from "./Utilities";
import InnerText from "./InnerText";
import {Button, TextField} from "@mui/material";
import Comment from "./Comment";

export default function Comments(props) {
    const [comments, setComments] = useState([]);
    const [answer, setAnswer] = useState("");

    const handleChange = (event) => {
        setAnswer(event.target.value);
    };
    
    useEffect( async () => {
        const tempComments = await fetch(`http://10.30.68.74:8000/get_comments?qid=${encodeURIComponent(props.qid)}`) // Florent : 10.30.68.78 - Thomas : 10.30.68.74
            .then(response => response.json())
            .then(data => data);
        setComments(tempComments);
    }, [props.qid]);
    
    return (
        <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: PADDING_LEFT,
            paddingRight: PADDING_RIGHT,
            paddingTop: PADDING_TOP,
            paddingBottom: PADDING_BOTTOM
        }}>
            <InnerText>{props.question}</InnerText>
            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: PADDING_LEFT,
                paddingRight: PADDING_RIGHT,
                paddingTop: PADDING_TOP,
                paddingBottom: PADDING_BOTTOM
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
                    <Button variant="contained" color="primary" onClick={() => {
                        console.log(answer);
                        // TODO send api answer
                    }}> + </Button>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: 1
                }}>
                    {comments.map((comment, index) => {
                        return (
                            <Comment key={index} comment={comment.comment} count={comment.like_count}/>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}