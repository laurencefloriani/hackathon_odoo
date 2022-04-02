import Banner from "./Banner";
import {Button, TextField} from "@mui/material";
import {View} from "react-native-web";
import {PADDING_LEFT, PADDING_RIGHT, PADDING_TOP} from "./Utilities";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Home() {
    const [pseudo, setPseudo] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        setPseudo(event.target.value);
    };

    const handleClickTeacher = () => {
        if(pseudo.length > 0) {
            navigate("/teacher", {replace: true, state: {pseudo: pseudo}})
        } else {
            alert("Please enter a pseudo");
        }
    };

    const handleClickStudent = () => {
        if(pseudo.length > 0) {
            navigate("/student", {replace: true, state: {pseudo: pseudo}});
        } else {
            alert("Please enter a pseudo");
        }
    };

    return (
        <div className="app-container" >
            <Banner subtitle="Home"/>
            <View style={{
                marginTop: PADDING_TOP,
                alignItems: 'center'

            }}>
                <TextField id="pseudo" label="Enter a pseudo" variant="standard" onChange={handleChange} />
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: PADDING_LEFT,
                    paddingRight: PADDING_RIGHT,
                    paddingTop: PADDING_TOP
                }}>
                    <Button onClick={handleClickStudent} variant="contained" color="success" style={{marginRight: PADDING_RIGHT}}> Student </Button>
                    <Button onClick={handleClickTeacher} variant="contained" color="primary"> Teacher </Button>
                </View>
            </View>
        </div>
    );
}