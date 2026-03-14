import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function SignIn() {
    const [visible, setVisible] = useState("show")
    const handlePassword = () => {
        if (visible === "show") {
            setVisible("hide");
        } else {
            setVisible("show");
        }
    }

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })
    const {username, email, password} = formData;

    const handleChange = (event) => {
        setFormData({
            ...formData, [event.target.name]: event.target.value
        })
    }


    const handleAuthentication = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post("http://localhost:8081/api/auth", formData);
            if (res.status === 200) {
               alert("Login Successful!")
               localStorage.setItem("token", res.data.token);
               navigate("/verify");

            }
        } catch (e) {
            console.log(e.response.data)
            alert(e.response.data.error)
        }
    }

    return (
        <>
            <section className="sign-in-section">
                <div className="flex flex-col justify-center items-center h-dvh mx-auto ">
                    <div className="sign-in-form mt-3 md:w-[30%]">
                        <form onSubmit={handleAuthentication} className="grid shadow-lg border border-gray-300 rounded-4xl py-10 px-5" method="POST">
                            <div className="sign-in-logo mb-5 text-center">
                                <p className="bg-sky-900 py-2 px-3 text-2xl w-fit mx-auto rounded-4xl font-semibold text-white"> BS </p>
                                <p className="font-bold text-xl text-gray-900 underline underline-offset-5"> Fashion </p>
                            </div>
                                <div className="form-group grid mb-6">
                                    <label htmlFor="uname" className="text-blue-950 font-semibold text-sm"> Your Username* </label>
                                    <input type="text" className="form-data mt-1" name="username" id="uname" placeholder="Enter Username" onChange={handleChange} required />
                                </div>
                                <div className="form-group grid">
                                    <label htmlFor="email" className="text-blue-950 font-semibold text-sm"> Email Address* </label>
                                    <input type="email" className="form-data mt-1" name="email" id="email" placeholder="Enter Email" onChange={handleChange} required />
                                </div>
                                <div className="form-group grid mt-5">
                                    <label htmlFor="password" className="text-blue-950 font-semibold text-sm"> Password* </label>
                                    <div className="form-data flex justify-between items-center">
                                        <input type={`${visible==="show"?"password":"text"}`} className="outline-0 mt-1 w-[80%]" name="password" placeholder="Enter Password" onChange={handleChange} id="password" required />
                                        <p className="text-gray-400 cursor-pointer" onClick={handlePassword}> {visible} </p>
                                    </div>
                                </div>
                                <p className="text-[red] text-sm font-semibold mt-3"> NOTE : All Field Required! </p>
                                <div className="submit-btn-group pt-5 grid">
                                    <button type="submit" className="bg-blue-600 py-3 font-semibold text-white rounded-xl"> Log In </button>
                                </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
