import Banner from "./Banner";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {View} from "react-native-web";
import {PADDING_TOP} from "./Utilities";

export default function App() {
    let navigate = useNavigate();

    return (
        <div className="app-container" >
            <Banner subtitle="Home"/>
            <View style={{
                marginTop: PADDING_TOP,
                alignItems: 'center'

            }}>
                <Button onClick={
                    () => navigate("/student", {replace: true})
                } variant="contained" color="success"> Student </Button>
                <br/>
                <Button onClick={
                    () => navigate("/teacher", {replace: true})
                } variant="outlined" color="error"> Teacher </Button>
            </View>
        </div>
    );
}