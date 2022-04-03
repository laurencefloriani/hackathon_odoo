import Banner from "./Banner";
import {Button, Checkbox, TextField} from "@mui/material";
import {View} from "react-native-web";
import {PADDING_RIGHT, PADDING_TOP, SERVER_ADDR} from "./Utilities";
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
    const [anonymise, setAnonymise] = useState(false);

    useEffect( async () => {
        const tempData = await fetch(`${SERVER_ADDR}/questions`) // Florent : 10.30.68.78 - Thomas : 10.30.68.74
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
        console.log(anonymise);
        if (anonymise) {
            alert("You must have a pseudo to access this page (if you are teacher)");
        } else if(pseudo.length > 0) {
            navigate("/teacher", {replace: true, state: {pseudo: pseudo, data: mainState, anonymise: anonymise}});
        } else {
            alert("Please enter a pseudo");
        }
    };

    const handleClickStudent = () => {
        forceUpdate();
        if(pseudo.length > 0) {
            navigate("/student", {replace: true, state: {pseudo: pseudo, data: mainState, anonymise: anonymise}})
        } else {
            alert("Please enter a pseudo");
        }
    };

    const handleClickAnonymise = (event) => {
        setAnonymise(event.target.checked);
    };


    return (
        <div className="app-container" >
            <Banner isTeacher={false}/>
            <View style={{
                marginTop: PADDING_TOP,
                alignItems: 'center'

            }}>
                <TextField id="pseudo" label="Enter a pseudo" variant="standard" onChange={handleChange} />
                <View style={{
                    flexDirection: 'row',
                    paddingTop: "2%",
                }}>
                    <InnerText>Do you want to be anonymise or not (pseudo showed)? <Checkbox
                        defaultChecked={anonymise}
                        color="default"
                        onClick={handleClickAnonymise}
                        sx={{'& .MuiSvgIcon-root': { fontSize: 30 }}}/></InnerText>
                </View>
                <View>
                    <InnerText>Select a role:</InnerText>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: "2%",
                }}>
                    <Button onClick={handleClickStudent} variant="contained" color="success" style={{marginRight: PADDING_RIGHT}}> Student </Button>
                    <Button onClick={handleClickTeacher} variant="contained" color="primary"> Teacher </Button>
                </View>
            </View>
        </div>
    );
}
