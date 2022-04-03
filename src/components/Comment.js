import {PADDING_BOTTOM, PADDING_LEFT, PADDING_RIGHT, PADDING_TOP, SERVER_ADDR} from "./Utilities";
import {View} from "react-native-web";
import InnerText from "./InnerText";
import {Checkbox} from "@mui/material";
import {FavoriteBorder} from "@mui/icons-material";
import Favorite from '@mui/icons-material/Favorite';
import {pink} from "@mui/material/colors";

export default function Comment(props) {
    const handleClickLike = (event) => {
        fetch(`${SERVER_ADDR}/like_comment?qid=${encodeURIComponent(props.qid)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment_id: props.id,
                user: 1,
                action: event.target.checked ? 'like' : 'unlike'
            })
        });
    }

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: PADDING_TOP,
            paddingBottom: PADDING_BOTTOM
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: PADDING_TOP,
                paddingBottom: PADDING_BOTTOM
            }}>
                <View style={{paddingLeft: PADDING_LEFT, width: "250px"}}>
                    <InnerText>{props.comment}</InnerText>
                </View>
                <View style={{paddingLeft: PADDING_LEFT, width: "50px"}}>
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
        </View>
        );
}
