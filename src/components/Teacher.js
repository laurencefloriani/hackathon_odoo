import Banner from "./Banner";
import {View} from "react-native-web";
import {useEffect, useState} from "react";
import VideoPlayer from 'react-video-markers';
import {PADDING_BOTTOM, PADDING_LEFT, PADDING_RIGHT, PADDING_TOP} from "./Utilities";
import {useLocation} from "react-router-dom";


export default function Teacher(props){
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentState, setCurrentState] = useState({
        timeLine: [],
        markers: [{}],
    })
    let currentIndex = 0;
    const {state} = useLocation();
    const {pseudo} = state;

    const controls = [
        'play',
        'time',
        'progress',
        'volume',
        'full-screen'
    ];

    useEffect( async () => {
        const tempTimeLine = await fetch("http://10.30.68.74:8000/questions")
            .then(res => res.json())
            .then(res => {
                return res.map(item => {
                    return item.end_timestamp;
                })
            })
        console.log(tempTimeLine);
        let tempMarkers = [];
        for(let i = 0; i < tempTimeLine.length; i++){
            tempMarkers.push({
                time: tempTimeLine[i],
                text: `Question ${i + 1}`,
                id: `Question ${i + 1}`,
                style: {
                    color: '#fff',
                    backgroundColor: '#000',
                    fontSize: '1.5em'
                }
            })
        }
        setCurrentState({
            timeLine: tempTimeLine,
            markers: tempMarkers
        })
    }, [])

    const fetch_api = (url) => {
        const tempTimeLine = fetch(url)
            .then(res => res.json())
            .then(res => {
                let temp = res.map(item => {
                        return item.end_timestamp;
                    })
                return temp;
            })
        console.log(tempTimeLine);
        let tempMarkers = [];
        for(let i = 0; i < tempTimeLine.length; i++){
            tempMarkers.push({
                time: tempTimeLine[i],
                text: `Question ${i + 1}`,
                id: `Question ${i + 1}`,
                style: {
                    color: '#fff',
                    backgroundColor: '#000',
                    fontSize: '1.5em'
                }
            })
        }
        setCurrentState({
            timeLine: tempTimeLine,
            markers: tempMarkers
        })
    }

    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handleProgress = e => {
        if (e.target.currentTime > currentState.timeLine[currentIndex]) {
            setIsPlaying(false);
            currentIndex ++;
        }
    };

    return (
        <div className="teacher">
            <Banner subtitle="Teacher interface"/>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: PADDING_LEFT,
                paddingRight: PADDING_RIGHT,
                paddingTop: PADDING_TOP,
                paddingBottom: PADDING_BOTTOM
            }}>
                {currentState.timeLine.length > 0 && currentState.markers.length > 0?
                    <VideoPlayer
                        url={"rick.mp4"}
                        controls={controls}
                        isPlaying={isPlaying}
                        onPlay={handlePlay}
                        onPause={handlePause}
                        markers={currentState.markers}
                        onProgress={handleProgress}
                    />
                    :null}
            </View>
        </div>
    );
}