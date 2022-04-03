import {PADDING_BOTTOM, PADDING_LEFT, PADDING_RIGHT, PADDING_TOP, SERVER_ADDR} from "./Utilities";
import {Text, View} from "react-native-web";
import InnerText from "./InnerText";
import {Checkbox} from "@mui/material";
import {FavoriteBorder} from "@mui/icons-material";
import Favorite from '@mui/icons-material/Favorite';
import {pink} from "@mui/material/colors";
import {useEffect, useState} from "react";

export default function Comment(props) {
    const [commentAuthor, setCommentAuthor] = useState("");

    useEffect(() => {
        fetch(`${SERVER_ADDR}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: props.author_id
            }),
        }).then(res => res.json())
            .then(user => {
                setCommentAuthor(user.username);
            })
    }, []);

    const handleDelete = (event) => {
        fetch(`${SERVER_ADDR}/del`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment_id: props.id,
                user: props.author_id
            })
        });
    }


    const handleClickLike = (event) => {
        fetch(`${SERVER_ADDR}/like_comment?qid=${encodeURIComponent(props.qid)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment_id: props.id,
                user_id: props.current_user_id,
                action: event.target.checked ? 'like' : 'unlike'
            })
        });
    }

    return (
        <View style={{
            flexDirection: 'column',
            marginTop: PADDING_TOP,
            alignItems: 'center',
            padding: "5px",
            flex: 0.3,
            backgroundColor: "#d7d7d7",
            borderWidth: 2,
            borderRadius: 20,
            width: "400px"
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingTop: PADDING_TOP,
                paddingBottom: PADDING_BOTTOM
            }}>
                <View style={{width: "225px"}}>
                    <InnerText>{props.comment}</InnerText>
                </View>
                <View style={{paddingLeft: PADDING_LEFT, width: "75px"}}>
                    <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        onClick={handleClickLike}
                        sx={{
                            '& .MuiSvgIcon-root': { fontSize: 30, color: pink[700], '&.Mui-checked': {color: pink[500]}}}}/>
                </View>
                <View style={{paddingLeft: PADDING_LEFT, width: "50px"}}>
                    <InnerText>{props.count}</InnerText>
                </View>
            </View>
            <View>
                <Text style={{
                    fontStyle: 'italic'
                }}>{commentAuthor}</Text>
            </View>
        </View>
        );
}
