import Banner from "./Banner";
import {useLocation} from "react-router-dom";
import Comments from "./Comments";

export default function Student(props) {
    const {state} = useLocation();
    const {pseudo, data} = state;

    return (
        <div className="student">
            <Banner subtitle="Student interface"/>
            <Comments question={data.questions[data.index]} qid={data.qid[data.index]}/>
        </div>
    );
}

