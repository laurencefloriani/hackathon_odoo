import {Text} from "react-native-web";
import {
    INNER_TEXT_SIZE,
    PADDING_BOTTOM,
    PADDING_LEFT,
    PADDING_RIGHT,
    PADDING_TOP
} from "./Utilities";

export default function InnerText (props) {

    return (
        <Text
            style={{
                fontSize: INNER_TEXT_SIZE,
                paddingTop: PADDING_TOP
        }}>
            {props.children}
        </Text>
    )
}