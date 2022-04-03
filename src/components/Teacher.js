import Banner from "./Banner";
import {View} from "react-native-web";
import {useEffect, useState} from "react";
import VideoPlayer from 'react-video-markers';
import {PADDING_BOTTOM, PADDING_LEFT, PADDING_TOP, SERVER_ADDR} from "./Utilities";
import {useLocation} from "react-router-dom";
import Comments from "./Comments";


export default function Teacher(props){
    const {state} = useLocation();
    const {pseudo, data, anonymise} = state;
    let currentIndex = 0;

    const [isPlaying, setIsPlaying] = useState(false);
    const [markers, setMarkers] = useState([]);

    const controls = [
        'play',
        'time',
        'progress',
        'volume',
        'full-screen'
    ];

    useEffect( async () => {
        let tempMarkers = [];
        for(let i = 0; i < data.timeline.length; i++){
            tempMarkers.push({
                time: data.timeline[i],
                text: `Question ${i + 1}`,
                id: `Question ${i + 1}`,
                style: {
                    color: '#fff',
                    backgroundColor: '#000',
                    fontSize: '1.5em'
                }
            })
        }
        setMarkers(tempMarkers);
    }, [data.timeline])

    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handleProgress = e => {
        if (e.target.currentTime > data.timeline[currentIndex]) {
            console.log("Numbers of questions: ", data.qid.length);
            console.log("CurrentIndex: ", currentIndex);
            if (currentIndex + 1 >= data.qid.length) {
                return;
            }
            
            currentIndex++;
            console.log(`${SERVER_ADDR}/change_question?qid=${encodeURIComponent(data.qid[currentIndex])}`)
            setIsPlaying(false);
            fetch(`${SERVER_ADDR}/change_question?qid=${encodeURIComponent(data.qid[currentIndex])}`, {
                method: 'POST',
            });
            console.log("CurrentIndex - ", currentIndex);
        }
    };

    return (
        <div className="teacher">
            <Banner isTeacher={true} place={"Teacher interface"}/>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: PADDING_TOP,
                paddingBottom: PADDING_BOTTOM
            }}>
                {data.timeline.length > 0 && markers.length > 0?
                    <VideoPlayer
                        url={"demo.mp4"}
                        controls={controls}
                        isPlaying={isPlaying}
                        onPlay={handlePlay}
                        onPause={handlePause}
                        markers={markers}
                        onProgress={handleProgress}
                    />
                    :null}
                <View style={{paddingLeft: PADDING_LEFT}}>
                    <Comments question={data.questions[0]} qid={data.qid[0]}/>
                </View>
            </View>
        </div>
    );
}
