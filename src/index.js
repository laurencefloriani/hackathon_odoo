import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {HashRouter, Route, Routes} from "react-router-dom";
import Teacher from "./components/Teacher";
import Student from "./components/Student";
import { SSEProvider } from 'react-hooks-sse';

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <SSEProvider endpoint="http://10.30.68.74:8000/stream">
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/teacher" element={<Teacher />} />
                    <Route path="/student" element={<Student />} />
                </Routes>
            </SSEProvider>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
