import {AppBar, Box, Toolbar} from "@mui/material";
import Typography from '@mui/material/Typography';
import "../styles/Banner.css";
import {useNavigate} from "react-router-dom";
import {Text, View} from "react-native-web";
import {FiHome} from "react-icons/fi";


export default function Banner(props) {
    let navigate = useNavigate();

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" style={{ background: '#000000'}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TITLE
                    </Typography>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {props.subtitle}
                    </Typography>
                    <button onClick={() => navigate("/")} >
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