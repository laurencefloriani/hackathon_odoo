import Banner from "./Banner";
import {useEffect} from "react";

export default function Student(props) {
    useEffect( async () => {
        await fetch_api("http://10.30.68.74:8000/questions");
    }, [])

    const fetch_api = (url) => {
        fetch(url)
            .then(res => res.json())
            .then(res => {

            })
    }

    return (
        <div className="student">
            <Banner subtitle="Student interface"/>
            
        </div>
    );
}

