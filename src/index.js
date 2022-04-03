import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {HashRouter, Route, Routes} from "react-router-dom";
import Teacher from "./components/Teacher";
import Student from "./components/Student";
import { SSEProvider } from 'react-hooks-sse';
import {SERVER_ADDR} from './components/Utilities'
import ReplaceVideo from "./components/ReplaceVideo";

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <SSEProvider endpoint={`${SERVER_ADDR}/stream`}>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/teacher" element={<Teacher />} />
                    <Route path="/teacher/replace" element={<ReplaceVideo />} />
                    <Route path="/student" element={<Student />} />
                </Routes>
            </SSEProvider>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
