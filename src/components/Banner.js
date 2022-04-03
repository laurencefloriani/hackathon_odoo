import {AppBar, Box, Toolbar} from "@mui/material";
import Typography from '@mui/material/Typography';
import "../styles/Banner.css";
import {useNavigate} from "react-router-dom";
import {Text, View} from "react-native-web";
import {FiHome} from "react-icons/fi";
import {BiAddToQueue} from "react-icons/bi";


export default function Banner(props) {
    let navigate = useNavigate();
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" style={{ background: '#000000'}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        LangOverflow
                    </Typography>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {props.place}
                    </Typography>
                    {props.isTeacher ?
                        <button onClick={() => navigate('/teacher/replace')} >
                            <View>
                                <Text style={{fontSize: 45}}>
                                    <BiAddToQueue className="link" />
                                </Text>
                            </View>
                        </button>:null}
                    <button onClick={() => navigate('/')} >
                        <View>
                            <Text style={{fontSize: 45}}>
                                <FiHome className="link" />
                            </Text>
                        </View>
                    </button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
