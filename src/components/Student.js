import Banner from "./Banner";
import {useLocation} from "react-router-dom";
import Comments from "./Comments";

export default function Student(props) {
    const {state} = useLocation();
    const {pseudo, user_id, data, anonymise} = state;

    return (
        <div className="student">
            <Banner isTeacher={false} place={`Student interface ${pseudo}`}/>
            {console.log(anonymise)}
            <Comments question={data.questions[data.index]} qid={data.qid[data.index]} user_id={user_id}/>
        </div>
    );
}

