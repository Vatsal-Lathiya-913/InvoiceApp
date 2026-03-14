import React, {useEffect} from 'react';
import axios from "axios";
import {id} from "zod/locales";

export default function InvoiceData() {
    const [data, setData] = React.useState([]);
    const fetchData = async () => {
        try {
            const res = await axios.post("http://localhost:8081/api/invoice/data")
                .then(res => {
                    setData(res.data);
                }).catch(err => {
                    console.log(err);
                })
        }catch (e) {
            console.log(e)
        }
    }

    const deleteData = async (e) => {
        const InvoiceID = e.target.parentNode.parentNode.children[0].id;
        const invoice = confirm("Are you sure you want to delete this invoice?");
        if (invoice) {
            const res = axios.delete(`http://localhost:8081/api/invoice/${InvoiceID}`)
                .then(res => {
                    console.log(res);
                    window.location.reload();
                }).catch(err => {
                    console.log(err);
                })
        }else{
            console.log("No Invoice Deleted");
        }
    }

    useEffect(() => {
        fetchData();
    },[])
    return (
        <>
            <section className="invoice-list-section h-dvh">
                <div className="invoice-data-container mx-8">
                    <p className="mt-6 font-semibold text-2xl"> Invoices Statements </p>
                    <p className="text-gray-500"> List of All Invoices Data </p>
                    <div className="invoices-data-table-container border rounded-lg overflow-hidden mt-6">
                        <table className="invoices-table ">
                            <thead>
                                <tr>
                                    <th className="bg-gray-300/70 text-gray-700 font-[650] text-[13px]"> Invoice No. </th>
                                    <th className="bg-gray-300/70 text-gray-700 font-[650] text-[13px]"> Customer </th>
                                    <th className="bg-gray-300/70 text-gray-700 font-[650] text-[13px]"> GSTIN </th>
                                    <th className="bg-gray-300/70 text-gray-700 font-[650] text-[13px]"> Mobile </th>
                                    <th className="bg-gray-300/70 text-gray-700 font-[650] text-[13px]"> Email </th>
                                    <th className="bg-gray-300/70 text-gray-700 font-[650] text-[13px]"> Amount </th>
                                    <th className="bg-gray-300/70 text-gray-700 font-[650] text-[13px]"> Invoice Date </th>
                                    <th className="bg-gray-300/70 text-gray-700 font-[650] text-[13px]"> Due Date </th>
                                    <th className="bg-gray-300/70 text-gray-700 font-[650] text-[13px]"> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map(invoice => {
                                        return (
                                            <tr key={invoice._id} className="text-[13px] text-gra3-7/7000">
                                                <td id={invoice._id} className="font-semibold text-gray-600"> {invoice.billNo} </td>
                                                <td className="font-semibold"> {invoice?.toParty?.name} </td>
                                                <td className="font-semibold text-gray-600"> {invoice?.toParty?.gst} </td>
                                                <td className="font-semibold text-gray-600"> {invoice?.toParty?.mobile} </td>
                                                <td className="font-semibold text-gray-600"> {invoice?.toParty?.email} </td>
                                                <td className="font-semibold text-gray-600"> ₹{invoice?.grandTotal} </td>
                                                <td className="text-gray-600"> {invoice.invoiceDate.substring(0,10)} </td>
                                                <td className="text-gray-600"> {invoice.DueDate.substring(0,10)} </td>
                                                <td> <button className="bg-red-600 m-1 text-xs font-semibold rounded-xl text-white p-2" onClick={deleteData}> Remove </button> </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}
