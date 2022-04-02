import Banner from "./Banner";
import {View} from "react-native-web";
import {useState} from "react";
import VideoPlayer from 'react-video-markers';


export default function Teacher(props){
    const [isPlaying, setIsPlaying] = useState(false);
    let currentIndex = 0;
    const timeLine = [5, 10, 15, 65]

    const controls = [
        'play',
        'time',
        'progress',
        'volume',
        'full-screen'
    ];

    let markers = [];
    for (let i = 0; i < timeLine.length; i++) {
        markers.push({
            time: timeLine[i],
            text: `${timeLine[i]}s`,
            style: {
                color: '#fff',
                backgroundColor: '#000',
                fontSize: '1.5em'
            }
        });
    }

    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handleProgress = e => {
        if (e.target.currentTime > timeLine[currentIndex]) {
            setIsPlaying(false);
            currentIndex ++;
        }
    };

    return (
        <div className="teacher">
            <Banner subtitle="Teacher interface"/>
            <View style={{flexDirection: 'column', alignItems: 'center', paddingLeft: '15%', paddingRight: '15%', paddingTop: '5%', paddingBottom: '5%'}}>
                <VideoPlayer
                    url={"rick.mp4"}
                    controls={controls}
                    isPlaying={isPlaying}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    markers={markers}
                    onProgress={handleProgress}
                />
            </View>
        </div>
    );
}