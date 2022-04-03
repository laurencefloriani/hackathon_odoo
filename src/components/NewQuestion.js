import {TextField} from "@mui/material";
import {useState} from "react";

export default function NewQuestion() {
    const [question, setQuestion] = useState("");
    const [startSlot, setStartSlot] = useState("");
    const [endSlot, setEndSlot] = useState("");

    const handleChangeQuestion = (event) => {
        setQuestion(event.target.value);
    };

    const handleChangeStartSlot = (event) => {
        setStartSlot(event.target.value);
    };

    const handleChangeEndSlot = (event) => {
        setEndSlot(event.target.value);
    };

    return (
        <form>
            <TextField id="question" label="Enter a question" variant="standard" onChange={handleChangeQuestion} />
            <TextField id="start" label="Enter a start slot" variant="standard" onChange={handleChangeStartSlot} />
            <TextField id="end" label="Enter a end slot" variant="standard" onChange={handleChangeEndSlot} />
        </form>
    )
}

