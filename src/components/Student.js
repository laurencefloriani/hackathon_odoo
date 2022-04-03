import Banner from "./Banner";
import {useLocation} from "react-router-dom";
import Comments from "./Comments";
import InnerText from "./InnerText";

export default function Student(props) {
    const {state} = useLocation();
    const {pseudo, user_id, data, anonymise} = state;

    return (
        <div className="student">
            <Banner isTeacher={false} place={"Student interface"}/>
            {console.log(anonymise)}
            {anonymise ? null: <InnerText>Pseudo: {pseudo}</InnerText>}
            <Comments question={data.questions[data.index]} qid={data.qid[data.index]} user_id={user_id}/>
        </div>
    );
}

