import {PADDING_BOTTOM, PADDING_LEFT, PADDING_RIGHT, PADDING_TOP} from "./Utilities";
import {View} from "react-native-web";
import InnerText from "./InnerText";

export default function Comment(props) {
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
            </View>
        </View>
        );
}