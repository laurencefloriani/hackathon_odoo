import Banner from "./Banner";
import {View} from "react-native-web";
import {useEffect, useState} from "react";
import VideoPlayer from 'react-video-markers';
import {PADDING_BOTTOM, PADDING_LEFT, PADDING_RIGHT, PADDING_TOP} from "./Utilities";
import {useLocation} from "react-router-dom";
import Comments from "./Comments";


export default function Teacher(props){
    const {state} = useLocation();
    const {pseudo, data} = state;

    const [isPlaying, setIsPlaying] = useState(false);
    const [markers, setMarkers] = useState([]);

    let currentIndex = 0;

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
            setIsPlaying(false);
            currentIndex ++; // TODO Replace by send to API signal
        }
    };

    return (
        <div className="teacher">
            <Banner subtitle="Teacher interface"/>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: PADDING_TOP,
                paddingBottom: PADDING_BOTTOM
            }}>
                {data.timeline.length > 0 && markers.length > 0?
                    <VideoPlayer
                        url={"rick.mp4"}
                        controls={controls}
                        isPlaying={isPlaying}
                        onPlay={handlePlay}
                        onPause={handlePause}
                        markers={markers}
                        onProgress={handleProgress}
                    />
                    :null}
                <Comments question={data.questions[data.index]} qid={data.qid[data.index]}/>
            </View>
        </div>
    );
}