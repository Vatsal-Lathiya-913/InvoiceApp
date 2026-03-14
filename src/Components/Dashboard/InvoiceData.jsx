import React, {useEffect} from 'react';
import axios from "axios";

export default function InvoiceList() {
    const [data, setData] = React.useState([])
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
    useEffect(() => {
        fetchData();
    },[])
    return (
        <section className="invoice-list-section h-dvh">
            <div className="invoice-data-container mx-8">
                <p className="mt-6 font-semibold text-2xl"> Invoices Statements </p>
                <p className="text-gray-500"> List of All Invoices Data </p>
                <div className="invoices-data-table-container mt-6">
                    <table className="invoices-table border-2">
                        <thead>
                            <tr>
                                <th> Invoice No. </th>
                                <th> Customer </th>
                                <th> GSTIN </th>
                                <th> Mobile </th>
                                <th> Email </th>
                                <th> Amount </th>
                                <th> Invoice Date </th>
                                <th> Due Date </th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map(invoice => {
                                    return (
                                        <tr key={invoice.id}>
                                            <td> {invoice.billNo} </td>
                                            <td> {invoice?.toParty?.name} </td>
                                            <td> {invoice?.toParty?.gst} </td>
                                            <td> {invoice?.toParty?.mobile} </td>
                                            <td> {invoice?.toParty?.email} </td>
                                            <td> ₹{invoice?.grandTotal} </td>
                                            <td> {invoice.invoiceDate.substring(0,10)} </td>
                                            <td> {invoice.DueDate.substring(0,10)} </td>
                                            <td> <button className="bg-red-600 m-1 text-xs font-semibold rounded-xl text-white p-2"> Remove </button> </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
