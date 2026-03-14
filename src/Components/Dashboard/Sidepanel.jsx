import React from 'react'
import {Link} from "react-router-dom";

export default function Sidepanel() {
    return (
        // Sidepanel
        <section className="section-sidepanel hidden md:block h-auto bg-sky-600/10">
            <div className="container-panel">
                <div className="panel-logo bg-black rounded-full w-fit mx-auto p-3 mt-15 ">
                    <p className="text-white font-bold text-xl"> BS </p>
                </div>
                <p className="text-center font-semibold mt-2"> Bansi/Sujal <br/> Fashion </p>
                <div className="sidepanel-items mt-8 font-semibold mx-10 text-sky-900 items-center gap-3 flex flex-col">
                    <Link to="/dashboard" className="item hover:bg-sky-200/50 w-full py-3 cursor-pointer">
                        <p className="mx-4"> Dashboard </p>
                    </Link>
                    <Link to="/dashboard/invoices" className="item hover:bg-sky-200/50 w-full py-3 cursor-pointer">
                        <p className="mx-4"> Invoices </p>
                    </Link>
                    <Link to="/dashboard/help" className="item hover:bg-sky-200/50 w-full py-3 cursor-pointer">
                        <p className="mx-4"> Help </p>
                    </Link>
                </div>
                <div className="btns mt-50 mx-auto flex text-center">
                    <button className="profile-btn mx-auto bg-sky-900 text-white font-semibold p-4 rounded-full">
                        Log Out
                    </button>
                </div>
            </div>
        </section>
    )
}
