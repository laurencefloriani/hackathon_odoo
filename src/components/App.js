import Banner from "./Banner";
import {Button, TextField} from "@mui/material";
import {View} from "react-native-web";
import {PADDING_LEFT, PADDING_RIGHT, PADDING_TOP} from "./Utilities";
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import InnerText from "./InnerText";

export default function Home() {
    const [pseudo, setPseudo] = useState("");
    const [mainState, setMainState] = useState({
        timeline: [],
        comments: [],
        questions: [""],
        index: 0,
    });
    const navigate = useNavigate();
    const [,updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect( async () => {
        const tempData = await fetch("http://10.30.68.74:8000/questions") // Florent : 10.30.68.78 - Thomas : 10.30.68.74
            .then(response => response.json())
            .then(data => data);
        setMainState(
            {
                timeline: tempData.map((item) => item.end_timestamp), // [1]
                qid: tempData.map((item) => item.id), // []
                questions: tempData.map((item) => item.question), // [""]
                index: 0,
            });
        // TODO: Add fetch for index of question
    }, [])

    const handleChange = (event) => {
        setPseudo(event.target.value);
    };

    const handleClickTeacher = () => {
        forceUpdate();
        if(pseudo.length > 0) {
            navigate("/teacher", {replace: true, state: {pseudo: pseudo, data: mainState}})
        } else {
            alert("Please enter a pseudo");
        }
    };

    const handleClickStudent = () => {
        forceUpdate();
        if(pseudo.length > 0) {
            navigate("/student", {replace: true, state: {pseudo: pseudo, data: mainState}});
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
                <View>
                    <InnerText>Select a role:</InnerText>
                </View>
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