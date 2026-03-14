import React from 'react'
import "./App.css";
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Dashboard from "./Components/Dashboard/Dashboard";
import SignIn from "./Components/SignIn";
import Verification from "./Components/Verification";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<SignIn />} />
                <Route exact path="/dashboard/*" element={<Dashboard />} />
                <Route exact path="/verify" element={<Verification/>}/>
            </Routes>
        </BrowserRouter>
    )
}
