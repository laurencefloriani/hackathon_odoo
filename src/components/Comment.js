import {PADDING_BOTTOM, PADDING_LEFT, PADDING_RIGHT, PADDING_TOP, SERVER_ADDR} from "./Utilities";
import {View} from "react-native-web";
import InnerText from "./InnerText";
import {Checkbox} from "@mui/material";
import {FavoriteBorder} from "@mui/icons-material";
import Favorite from '@mui/icons-material/Favorite';

export default function Comment(props) {
    const handleClickLike = (event) => {
        fetch(`${SERVER_ADDR}/like_comment?qid=${encodeURIComponent(props.qid)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.token
            },
            body: JSON.stringify({
                comment_id: props.id,
                user: 1,
                action: props.isLiked ? 'like' : 'unlike'
            })
        });
    }

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: PADDING_LEFT,
            paddingRight: PADDING_RIGHT,
            paddingTop: PADDING_TOP,
            paddingBottom: PADDING_BOTTOM
        }}>
            <InnerText>{props.comment}</InnerText>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: PADDING_LEFT,
                paddingRight: PADDING_RIGHT,
                paddingTop: PADDING_TOP,
                paddingBottom: PADDING_BOTTOM
            }}>
                <InnerText>{props.count}</InnerText>
                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} onClick={handleClickLike} />
            </View>
        </View>
        );
}