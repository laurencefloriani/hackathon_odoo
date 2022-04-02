import Banner from "./Banner";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {View} from "react-native-web";

export default function App() {
    let navigate = useNavigate();

    return (
        <div className="app-container" >
            <Banner subtitle="Home"/>
            <View style={{marginTop: "10px", alignItems: 'center'}}>
                <Button onClick={() => navigate("/teacher", {replace: true})}> Teacher </Button>
                <Button onClick={() => navigate("/student", {replace: true})}> Student </Button>
            </View>
        </div>
    );
}