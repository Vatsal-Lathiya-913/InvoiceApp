import React, {Fragment, useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

const SidePanel = () => {
    return (
        <section className="sidepanel hidden bg-gray-100/80 rounded h-auto">
            <div className="panel-container">
                <div className="logo pt-12 text-center">
                    <p className="bg-blue-600 py-2 px-3 text-2xl w-fit mx-auto rounded-4xl font-semibold text-white"> BS </p>
                    <p className="font-bold text-xl text-gray-900 "> Fashion </p>
                </div>
                <div className="panel-items-container py-7 mx-auto flex items-center justify-center">
                    <ul className="panel-items grid gap-10">
                        <li className="items">
                            <a href=""> Dashboard</a>
                        </li>
                        <li className="items">
                            <a href=""> Invoices</a>
                        </li>
                        <li className="items">
                            <a href=""> Data </a>
                        </li>
                    </ul>
                </div>
                <div className="panel-btn mt-60 mx-auto flex justify-center">
                    <p> Profile </p>
                </div>
            </div>
        </section>
    )
}

const InvoiceTable = () => {
    return (
        <tbody>
                <tr className="bg-neutral-primary overflow-scroll">
                    <th
                        className="py-1 font-medium text-heading whitespace-nowrap">
                        <input type="text" className="border-2 text-sm text-gray-500 bg-gray-100/50 border-gray-200 p-2 rounded-lg"/>
                    </th>
                    <td className=" py-1">
                        <input type="text" className="border-2 text-sm text-gray-500 bg-gray-100/50 border-gray-200 p-2 rounded-lg"/>
                    </td>
                    <td className=" py-1">
                        <input type="number" className="border-2 text-sm text-gray-500 bg-gray-100/50 border-gray-200 p-2 rounded-lg"/>
                    </td>
                    <td className="py-1">
                        <input type="text" className="border-2 text-sm text-gray-500 bg-gray-100/50 border-gray-200 p-2 rounded-lg"/>
                    </td>
                    <td className=" py-1">
                        <input type="text" className="border-2 text-sm text-gray-500 bg-gray-100/50 border-gray-200 p-2 rounded-lg"/>
                    </td>
                </tr>
        </tbody>
    )
}

const GrandTotal = () => {
    return(
        <div className="grandtotal-container border w-100 mt-3 flex rounded-xl flex-col max-w-4xl">
            <div>
                <p className="text-md font-semibold border-b w-full p-3 "> Summary Amount </p>
            </div>
            <div className="grandtotal mx-3 grid gap-5 mt-4">
                <div className="flex justify-between">
                    <p> Subtotal </p>
                    <p> $100 </p>
                </div>
                <div className="flex justify-between">
                    <p> CGST </p>
                    <p> 2.5 </p>
                </div>
                <div className="flex justify-between">
                    <p> SGST </p>
                    <p> 2.5 </p>
                </div>
                <div className="flex border-t border-b py-4 font-bold justify-between">
                    <p> Grand Total </p>
                    <p> $105.00</p>
                </div>
            </div>
            <div className="btns flex gap-5 p-2">
                <div className="save-invoice-btn rounded-lg bg-gray-200 p-2 w-full">
                    <button className="text-center mx-auto text-sm font-semibold flex"> Save Invoice </button>
                </div>
                <div className="pdf-generate-btn rounded-lg bg-black p-2 w-full">
                    <button className="text-center mx-auto text-sm flex text-white font-semibold cursor-pointer "> Make Invoice PDF </button>
                </div>
            </div>
        </div>
    )
}

export default function Dashboard() {
    const [addColumn, setAddColumn] = useState(0);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate("/");
        }
    })
    return (
        <>
            <div className="container grid md:[grid-template-columns:0.4fr_1.5fr] grid-cols-2">
                <SidePanel/>
                {/*Dashboard-Section*/}
                <section className="dashboard-section mt-9 ">
                    <div className="container grid mx-15 ">
                        <div className="left border p-5 w-[90%] rounded-xl h-auto border-gray-300">
                            <p className="text-2xl border-3 px-2 w-fit rounded-lg  text-gray-700 font-bold"> Create Invoice </p>
                            <form className="invoice-bill-form  mt-5 gap-10 ">
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div className="form-group flex flex-col">
                                        <label className="font-semibold text-gray-800"> From </label>
                                        <input type="text" className="border-2 text-sm text-gray-500 bg-gray-100/50 border-gray-200 p-3 rounded-lg"/>
                                    </div>
                                    <div className="form-group flex flex-col">
                                        <label className="font-semibold text-gray-800"> To </label>
                                        <input type="text" className="border-2 text-sm text-gray-500 bg-gray-100/50 border-gray-200 p-3 rounded-lg"/>
                                    </div>
                                </div>
                                <div className="grid-cols-1 mt-5">
                                    <div className="form-group flex flex-col">
                                        <label className="font-semibold text-gray-800"> GST Number </label>
                                        <input type="text" className="border-2 text-sm text-gray-500 font-semibold bg-gray-100/50 border-gray-200 p-3 rounded-lg"/>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-5 mt-5">
                                    <div className="form-group flex flex-col">
                                        <label className="font-semibold text-gray-800"> Challan Number </label>
                                        <input type="text" className="border-2  text-sm text-gray-500 bg-gray-100/50 border-gray-200 p-3 rounded-lg"/>
                                    </div>
                                    <div className="form-group flex flex-col">
                                        <label className="font-semibold text-gray-800"> Due Date </label>
                                        <input type="date" className="border-2 text-sm text-gray-500 bg-gray-100/50 border-gray-200 p-3 rounded-lg"/>
                                    </div>
                                </div>
                                <div className="bill-container mt-9">
                                    <p className="text-gray-600 text-lg font-bold underline underline-offset-4"> Items </p>
                                    <div className="bill-items mt-5 grid ">
                                        <table className=" text-sm text-left">
                                            <thead
                                                className="text-sm text-body">
                                            <tr>
                                                <th scope="col" className="py-1 font-medium">
                                                    Description
                                                </th>
                                                <th scope="col" className="py-1 font-medium">
                                                    HSN Code
                                                </th>
                                                <th scope="col" className="py-1 font-medium">
                                                    Quantity
                                                </th>
                                                <th scope="col" className=" py-1 font-medium">
                                                    Rate
                                                </th>
                                                <th scope="col" className="w py-1 font-medium">
                                                    Total Amount
                                                </th>
                                            </tr>
                                            </thead>
                                            {
                                                Array.from({length: addColumn}).map((_, index) => (
                                                    <InvoiceTable key={index} />
                                                ))
                                            }
                                            <InvoiceTable/>
                                        </table>
                                    </div>
                                </div>
                                <button type="button" className="bg-blue-500 p-2 mt-2 text-white rounded-xl cursor-pointer" onClick={() => setAddColumn(addColumn+1)}>
                                    Add Column
                                </button>
                            </form>
                        </div>
                        <GrandTotal />
                    </div>

                </section>
            </div>
        </>
    )
}
