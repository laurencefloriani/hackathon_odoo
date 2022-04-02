import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {HashRouter, Route, Routes} from "react-router-dom";
import Teacher from "./components/Teacher";
import Student from "./components/Student";

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/teacher" element={<Teacher />} />
                <Route path="/student" element={<Student />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
