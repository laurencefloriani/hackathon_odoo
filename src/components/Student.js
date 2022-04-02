import Banner from "./Banner";
import {useLocation} from "react-router-dom";
import Comments from "./Comments";
import InnerText from "./InnerText";

export default function Student(props) {
    const {state} = useLocation();
    const {pseudo, data, anonymise} = state;

    return (
        <div className="student">
            <Banner subtitle="Student interface"/>
            {anonymise? null: <InnerText>{pseudo}</InnerText>}
            <Comments question={data.questions[data.index]} qid={data.qid[data.index]}/>
        </div>
    );
}

