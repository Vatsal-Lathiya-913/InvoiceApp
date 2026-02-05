import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom";

export default function Verification() {
    const navigate = useNavigate();
    const otp = "ADMIN";
    let temp = "";

    const handleVerification = async (e) => {
        e.preventDefault();
        const data = document.querySelectorAll("input");
        data.forEach(element => {
            temp+= element.value;
        })
        console.log(temp,otp);
        if(otp===temp){
            alert("OTP Verified!");
            navigate("/dashboard");
            data.forEach(element => {
                element.value = "";
                temp = "";
            })
        }else{
            alert("OTP Wrong!");
        }
    }

    useEffect(()=>{
        if (!localStorage.getItem("token")){
           navigate("/");
        }
    },[])
    return (
        <>
            <section className="sign-in-section">
                <div className="flex flex-col justify-center items-center h-dvh mx-auto ">
                    <div className="otp-form mt-3 md:w-[30%]">
                        <form onSubmit={handleVerification} className="grid shadow-lg border border-gray-300 rounded-4xl py-10 px-5" method="POST">
                            <div className="otp-context mb-5 text-center">
                                <p className=" py-2 px-3 text-2xl w-fit mx-auto rounded-4xl font-bold text-gray-700/80"> Confirm Your OTP </p>
                                <p className="text-gray-500 text-sm"> Please Enter the 6 digit Verification Code </p>
                                <p className="font-semibold text-sm"> bsfashion@dashboard.com </p>
                            </div>
                            <div className="form-group grid grid-cols-5 mx-7 gap-5 mb-6">
                                <input type="text" className="form-data mt-1 text-center outline-blue-800 focus:outline-2" maxLength="1" name="otp" id="otp" required />
                                <input type="text" className="form-data mt-1 text-center outline-blue-800 focus:outline-2" maxLength="1" name="otp" id="otp" required />
                                <input type="text" className="form-data mt-1 text-center outline-blue-800 focus:outline-2" maxLength="1" name="otp" id="otp" required />
                                <input type="text" className="form-data mt-1 text-center outline-blue-800 focus:outline-2" maxLength="1" name="otp" id="otp" required />
                                <input type="text" className="form-data mt-1 text-center outline-blue-800 focus:outline-2" maxLength="1" name="otp" id="otp" required />
                            </div>
                            <p className="text-[red] text-sm font-semibold mt-3 mx-7"> NOTE : OTP is Required! </p>
                            <div className="submit-btn-group pt-5 mx-6 grid">
                                <button type="submit" className="bg-blue-600 py-3 font-semibold text-white rounded-xl" > Confirm </button>
                            </div>
                            <a href="/" className="mx-auto flex mt-5">
                                <img src="../../public/back.svg" alt=""/>
                                Back
                            </a>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

