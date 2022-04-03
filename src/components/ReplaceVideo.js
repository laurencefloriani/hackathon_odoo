import Banner from "./Banner";
import {View} from "react-native-web";
import {PADDING_BOTTOM, PADDING_TOP} from "./Utilities";

export default function ReplaceVideo() {
    const handleFileInput = () => {}

    return (
        <div>
            <Banner isTeacher={false} place={"Teacher interface"} isReplace={true}/>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: PADDING_TOP,
                paddingBottom: PADDING_BOTTOM
            }}>
            <View style={{
                flexDirection: "row",
            }}>
                <input type="file" onChange={handleFileInput}>

                </input>
                
            </View>
        </View>
        </div>
    )
}

