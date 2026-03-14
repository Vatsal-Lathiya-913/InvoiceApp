import React from 'react'
import Sidepanel from "./Sidepanel.jsx";
import Mainpanel from "./mainpanel.jsx";
import {Routes,Route,useNavigate} from 'react-router-dom';
import InvoiceData from "./InvoiceData.jsx";
import Help from "./Help.jsx";

export default function Dashboard() {
    const navigate = useNavigate();
    if(!localStorage.getItem("token")){
        navigate("/");
    }
    return (
        <div className="dashboard-grid">
            <Sidepanel />
            <Routes>
                <Route index element={<Mainpanel />}/>
                <Route exact path="/invoices" element={<InvoiceData />}/>
                <Route exact path="/help" element={<Help />}/>
            </Routes>
        </div>
    )
}
