import React, {useEffect, useState, useRef } from 'react';
import axios from "axios";
import {QrCode} from "lucide-react";

export default function Mainpanel() {
    let sum = 0;
    let calculateGST;
    // single row shape (we will NOT store Item_no here, we use index + 1 in UI)
    //Empty Data Set
    const emptyData =  {
        Item_no:1,
        Item_Description:"",
        Item_HSN:"",
        Item_Pcs:0,
        Item_Rate:0,
        Item_Amount:0,
    }

    //From Data
    const [fromData, setFromData] = useState({
        fromName:"Bansi/Sujal Fashion",
        fromGST:"",
        fromAdrs:"Plot No.61 Diwali Baug Soc.,A.K Road,Surat",
        fromMobNo:"9825116073",
        fromEmail:"bansi/sujalfashion.official@gmail.com",
        fromState:"Gujarat",
        fromStateCode:"24"
    });

    //To Data
    const [toData, setToData] = useState({
        toName:"",
        toGST:"",
        toAdrs:"",
        toMobNo:"",
        toEmail:"",
        toState:"",
        toStateCode:""
    });
    const {fromName,fromGST,fromAdrs,fromMobNo,fromEmail,fromState,fromStateCode} = fromData;
    const {toName,toGST,toAdrs,toMobNo,toEmail,toState,toStateCode} = toData;
    const [tableData, setTableData] = useState([{...emptyData}]);
    const [element, setElement] = useState(false);
    const [active, setActive] = useState(false);
    const [activeData, setActiveData] = useState({});
    const [calculationData, setCalculationData] = useState({
        sub_Total:0,
        CGST:"2.5%",
        SGST:"2.5%",
        Grand_Total:0,
    });

    const onchangeFrom = (e) => {
        setFromData({
            ...fromData,[e.target.name]: e.target.value
        })
    }

    const onchangeTo = (e) => {
        setToData({
            ...toData,[e.target.name]: e.target.value
        })
    }

    // EASY version: just push / pop rows, no Item_no in data
    const handleAddRow = () => {
        try {
            const newRow = { ...emptyData };
            setTableData([...tableData,{
                ...newRow,
                Item_no: tableData.length + 1
            }]);
        }catch(e){
            console.error(e)
        }
    }

    const handleRemoveRow = () => {
        try {
            if (tableData.length === 1) return;          // keep at least one row
            setTableData(tableData.slice(0, -1));
        }catch(e){
            console.log(e);
        }
                // drop last row
    }

    const invoiceDataChange = (index,e) => {
        try {
            const { name, value } = e.target;
            const newTableData = [...tableData];
            newTableData[index] = {
                ...newTableData[index],
                [name]: value,
            };
            const pcs = Number(newTableData[index].Item_Pcs);
            const rate = Number(newTableData[index].Item_Rate);
            newTableData[index].Item_Amount = pcs * rate;

            for (let i = 0; i < newTableData.length; i++) {
                sum+=newTableData[i].Item_Amount;
            }

            console.log(sum);
            calculateGST = sum * 0.05;
            setCalculationData({
                ...calculationData,
                sub_Total: sum,
                Grand_Total: sum + calculateGST,
            });
            setTableData(newTableData);
        }catch(e){
            console.log(e);
        }
    }

    const handleSubmitInvoice = async (e) => {
        e.preventDefault();
        try {
            const body = {
                fromParty:{
                    name:fromName,
                    address:fromAdrs,
                    gst:fromGST,
                    mobile:fromMobNo,
                    email:fromEmail,
                    state:fromState,
                    stateCode:fromStateCode,
                },
                toParty:{
                    name:toName,
                    address:toAdrs,
                    gst:toGST,
                    mobile:toMobNo,
                    email:toEmail,
                    state:toState,
                    stateCode:toStateCode
                },
                items: tableData.map((item, index) => ({
                    description:item.Item_Description,
                    hsn:item.Item_HSN,
                    qty:item.Item_Pcs,
                    rate:item.Item_Rate,
                }))
            }
            const res = await axios.post("http://localhost:8081/api/invoice/generate",body,{
                headers:{
                    "content-type": "application/json",
                    "Accept": "application/json",
                },
            }).then((response) => {
                setActiveData(response.data.invoice);
                setActive(true);
            }).catch((error) => {
                console.log(error.response.data);
            })
        }catch(e){
            console.log(e.error);
        }
    }

    const downloadPDF = async () => {
        window.print();
    };

    return (
        // mainpanel
        <section className="dashboard-panel">
            {
                element=== false ? (
                    <>
                        <div className="dashboard-panel-container px-2 md:px-0 max-w-6xl md:mx-auto mx-3">
                            <p className="mt-6 font-semibold text-2xl"> Create Invoice </p>
                            <div className="invoice-form-container mt-5">
                                <form className="invoice-form" onSubmit={handleSubmitInvoice}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="bg-gray-100 p-5 rounded-xl">
                                            <div className="form-group From md:flex gap-4">
                                                <div className="flex flex-col w-full">
                                                    <label htmlFor="from"> Business Name </label>
                                                    <input type="text" value={fromName} className="form-data" onChange={onchangeFrom} name="fromName" id="fromName"/>
                                                </div>
                                                <div className="flex flex-col w-full">
                                                    <label htmlFor="gstfrom"> GSTIN </label>
                                                    <input type="text" value={fromGST} className="form-data" onChange={onchangeFrom} name="fromGST" id="fromGST"/>
                                                </div>
                                            </div>
                                            <div className="form-group md:flex From gap-4 mt-2">
                                                <div className="flex flex-col w-full">
                                                    <label htmlFor="adrsfrom"> Address </label>
                                                    <input type="text" value={fromAdrs} className="form-data" onChange={onchangeFrom} name="fromAdrs" id="fromAdrs"/>
                                                </div>
                                            </div>
                                            <div className="form-group md:flex gap-4 mt-2">
                                                <div className="flex flex-col w-full">
                                                    <label htmlFor="adrsto"> Mobile No. </label>
                                                    <input type="text" value={fromMobNo} className="form-data" onChange={onchangeFrom} name="fromMobNo" id="fromMobNo"/>
                                                </div>
                                                <div className="flex flex-col w-full">
                                                    <label htmlFor="from"> Email </label>
                                                    <input type="text" value={fromEmail} className="form-data" onChange={onchangeFrom} name="fromEmail" id="fromEmail"/>
                                                </div>
                                            </div>
                                            <div className="form-group md:flex gap-4">
                                                <div className="flex flex-col  w-full">
                                                    <label htmlFor="stateto"> State  </label>
                                                    <input type="text" value={fromState} className="form-data" onChange={onchangeFrom} name="fromState" id="fromState"/>
                                                </div>
                                                <div className="flex flex-col w-full">
                                                    <label htmlFor="state"> State Code  </label>
                                                    <input type="text" value={fromStateCode} className="form-data" onChange={onchangeFrom} name="fromStateCode" id="fromStateCode"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-100 p-5 rounded-xl">
                                            <div className="form-group From md:flex gap-4">
                                                <div className="flex flex-col w-full">
                                                    <label htmlFor="from"> To </label>
                                                    <input type="text" value={toName} className="form-data" onChange={onchangeTo} name="toName" id="toName"/>
                                                </div>
                                                <div className="flex flex-col w-full">
                                                    <label htmlFor="gstto"> GSTIN </label>
                                                    <input type="text" value={toGST} className="form-data" onChange={onchangeTo} name="toGST" id="toGST"/>
                                                </div>
                                            </div>
                                            <div className="form-group md:flex From gap-4 mt-2">
                                                <div className="flex flex-col w-full">
                                                    <label htmlFor="adrsto"> Address </label>
                                                    <input type="text" value={toAdrs} className="form-data" onChange={onchangeTo} name="toAdrs" id="toAdrs"/>
                                                </div>
                                            </div>
                                            <div className="form-group md:flex gap-4 mt-2">
                                                <div className="flex flex-col w-full">
                                                    <label htmlFor="mobnoto"> Mobile No. </label>
                                                    <input type="text" value={toMobNo} className="form-data" onChange={onchangeTo} name="toMobNo" id="toMobNo"/>
                                                </div>
                                                <div className="flex flex-col w-full">
                                                    <label htmlFor="emailto"> Email </label>
                                                    <input type="text" value={toEmail} className="form-data" onChange={onchangeTo} name="toEmail" id="toEmail"/>
                                                </div>
                                            </div>
                                            <div className="form-group md:flex gap-4">
                                                <div className="flex flex-col  w-full">
                                                    <label htmlFor="stateto"> State </label>
                                                    <input type="text" value={toState} className="form-data" onChange={onchangeTo} name="toState" id="toState"/>
                                                </div>
                                                <div className="flex flex-col w-full">
                                                    <label htmlFor="state"> State Code  </label>
                                                    <input type="text" value={toStateCode} className="form-data" onChange={onchangeTo} name="toStateCode" id="toStateCode"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-data-table md:block hidden mt-4 p-3 bg-slate-200/40 overflow-hidden border rounded-lg">
                                        <p className="bg-white text-sm font-semibold border p-3"> Invoice Data </p>
                                        <table className="table mt-2">
                                            <thead>
                                            <tr >
                                                <th className="px-2 py-1 text-center text-sm font-semibold"> Item No. </th>
                                                <th className="px-2 py-1 text-center text-sm font-semibold"> Item Description </th>
                                                <th className="px-2 py-1 text-center text-sm font-semibold"> HSN Code </th>
                                                <th className="px-2 py-1 text-center text-sm font-semibold"> PCS </th>
                                                <th className="px-2 py-1 text-center text-sm font-semibold"> Rate </th>
                                                <th className="px-2 py-1 text-center text-sm font-semibold"> Amount </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {tableData.map((item, index) => (
                                                <tr className="items-data" key={index} >
                                                    <td className="w-full px-1 text-center">
                                                        {/* Item number is just index + 1, no state needed */}
                                                        <input
                                                            value={index + 1}
                                                            readOnly
                                                            className="form-data mt-2 max-w-30 text-center bg-gray-100"
                                                        />
                                                    </td>
                                                    <td className="w-full px-1">
                                                        <input value={item.Item_Description}  onChange={(e) => invoiceDataChange(index,e)} name="Item_Description"  type="text" className="form-data mt-2 w-xs"/>
                                                    </td>
                                                    <td className="w-full px-1">
                                                        <input value={item.Item_HSN}  onChange={(e) => invoiceDataChange(index,e)} name="Item_HSN" type="text" className="form-data mt-2"/>
                                                    </td>
                                                    <td className="w-full px-1">
                                                        <input value={item.Item_Pcs}  onChange={(e) => invoiceDataChange(index,e)} name="Item_Pcs"  type="number" className="form-data mt-2 max-w-20"/>
                                                    </td>
                                                    <td className="w-full px-1">
                                                        <input  value={item.Item_Rate}  onChange={(e) => invoiceDataChange(index,e)} name="Item_Rate" type="number" className="form-data mt-2"/>
                                                    </td>
                                                    <td className="w-full px-1">
                                                        <input value={item.Item_Amount} type="number" disabled className="form-data mt-2"/>
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                            </tbody>
                                        </table>
                                        <hr className="text-red-500 mt-3" />
                                        <div className="font-semibold text-[13px]">
                                            <button type="button" className="add-row-btn cursor-pointer transition active:scale-90 duration-300 bg-cyan-900  w-fit p-2 text-white mx-2 mt-3 rounded" onClick={handleAddRow} >
                                                Add Row
                                            </button>
                                            <button type="button" disabled={tableData.length === 1? true : false} className={`add-row-btn ${tableData.length===1?"bg-black/25":"cursor-pointer transition active:scale-90 duration-300 bg-black"}  w-fit p-2 text-white mx-2 mt-3 rounded`} onClick={handleRemoveRow}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="total-box-container flex flex-col gap-4 mb-5 mt-4 max-w-sm overflow-hidden bg-slate-200/50 border rounded-xl">
                                        <div className="subtotal flex font-semibold justify-between bg-white p-3 ">
                                            <p> Subtotal </p>
                                            <p> ₹{parseFloat(calculationData.sub_Total).toFixed(2)} </p>
                                        </div>
                                        <div className="cgst flex justify-between mx-3">
                                            <p> CGST </p>
                                            <p> ₹{calculationData.CGST} </p>
                                        </div>
                                        <div className="sgst flex justify-between mx-3">
                                            <p> SGST </p>
                                            <p> ₹{calculationData.SGST} </p>
                                        </div>
                                        <div className="grand-total p-3 font-semibold bg-white text-[16px] flex justify-between">
                                            <p> Grand Total </p>
                                            <p> ₹{parseFloat(calculationData.Grand_Total).toFixed(2)} </p>
                                        </div>
                                        <div className="btns flex mx-2 my-3 gap-3">
                                            <button type="submit" className="bg-gray-200 p-3 font-semibold rounded-xl cursor-pointer transition active:scale-[0.9] w-full"> Save Invoice</button>
                                            <button type="button" disabled={!active?true:false} className={`${active?"bg-black cursor-pointer transition active:scale-[0.9]":"bg-black/50"} text-white font-semibold rounded-xl w-full`} onClick={() => {
                                                setElement(true);
                                            }}> Invoice PDF </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                ):(
                   <>
                       <div
                           style={{
                               width:"210mm",
                               minHeight:"297mm",
                               margin:"auto",
                               padding:"24px",
                               border:"1px solid black",
                               background:"#ffffff",
                               color:"#000",
                               fontSize:"12px",
                               fontFamily:"sans-serif"
                           }}
                       >

                           <p style={{textAlign:"center",fontWeight:"bold",marginBottom:"10px"}}>
                               TAX INVOICE
                           </p>

                           {/* HEADER */}

                           <div style={{textAlign:"center",border:"1px solid black",padding:"8px"}}>
                               <h1 style={{fontSize:"22px",fontWeight:"bold"}}>
                                   {activeData.fromParty.name}
                               </h1>

                               <p style={{fontSize:"12px"}}>
                                   {activeData.fromParty.address}
                                   <br/>
                                   Surat, Gujarat, India
                               </p>

                               <p style={{fontSize:"12px",fontWeight:"600",marginTop:"4px"}}>
                                   GSTIN : {activeData.fromParty.gst}
                               </p>
                           </div>


                           {/* BUYER TITLE */}

                           <p style={{marginTop:"10px",fontWeight:"600"}}>
                               Buyer Detail :
                           </p>


                           {/* BILL DETAILS */}

                           <div style={{
                               display:"grid",
                               gridTemplateColumns:"1fr 1fr",
                               border:"1px solid black",
                               marginTop:"6px"
                           }}>

                               <div style={{padding:"8px",borderRight:"1px solid black"}}>

                                   <p>Name : <b>{activeData.toParty.name}</b></p>
                                   <p>Address : <b>{activeData.toParty.address}</b></p>
                                   <p>Mobile : <b>{activeData.toParty.mobile}</b></p>
                                   <p>GSTIN : <b>{activeData.toParty.gst}</b></p>
                                   <p>State : <b>{activeData.toParty.state}</b></p>
                                   <p>StateCode : <b>{activeData.toParty.stateCode}</b></p>

                               </div>

                               <div style={{padding:"8px"}}>

                                   <p>Invoice No : <b>{activeData.billNo}</b></p>
                                   <p>Issued Date : <b>{activeData.invoiceDate}</b></p>
                                   <p>Challan No :</p>
                                   <p>Due Date : <b>{activeData.DueDate}</b></p>

                               </div>

                           </div>


                           {/* ITEMS TABLE */}

                           <table style={{
                               width:"100%",
                               borderCollapse:"collapse",
                               marginTop:"12px"
                           }}>

                               <thead style={{background:"rgb(220,220,220)"}}>

                               <tr>

                                   <th style={{border:"1px solid black",padding:"4px"}}>Sr No</th>
                                   <th style={{border:"1px solid black",padding:"4px"}}>Description</th>
                                   <th style={{border:"1px solid black",padding:"4px"}}>HSN</th>
                                   <th style={{border:"1px solid black",padding:"4px"}}>Qty</th>
                                   <th style={{border:"1px solid black",padding:"4px"}}>Rate</th>
                                   <th style={{border:"1px solid black",padding:"4px"}}>Amount</th>

                               </tr>

                               </thead>

                               <tbody>

                               {activeData.items.map((item,index)=>(
                                   <tr key={index}>

                                       <td style={{borderLeft:"1px solid black",padding:"4px",textAlign:"center"}}>
                                           {index+1}
                                       </td>

                                       <td style={{borderLeft:"1px solid black",padding:"4px"}}>
                                           {item.description}
                                       </td>

                                       <td style={{borderLeft:"1px solid black",textAlign:"center"}}>
                                           {item.hsn}
                                       </td>

                                       <td style={{borderLeft:"1px solid black",textAlign:"center"}}>
                                           {item.qty}
                                       </td>

                                       <td style={{borderLeft:"1px solid black",textAlign:"center"}}>
                                           {item.rate}
                                       </td>

                                       <td style={{borderRight:"1px solid black",borderLeft:"1px solid black",textAlign:"center"}}>
                                           {item.amount}
                                       </td>

                                   </tr>
                               ))}

                               {/* CGST */}

                               <tr>

                                   <td style={{border:"1px solid black"}}></td>

                                   <td style={{border:"1px solid black",fontWeight:"bold"}}>
                                       Central GST (2.5%)
                                   </td>

                                   <td style={{border:"1px solid black"}}></td>
                                   <td style={{border:"1px solid black"}}></td>
                                   <td style={{border:"1px solid black"}}></td>

                                   <td style={{border:"1px solid black",textAlign:"center",fontWeight:"bold"}}>
                                       {activeData.cgst}
                                   </td>

                               </tr>


                               {/* SGST */}

                               <tr>

                                   <td style={{border:"1px solid black"}}></td>

                                   <td style={{border:"1px solid black",fontWeight:"bold"}}>
                                       State GST (2.5%)
                                   </td>

                                   <td style={{border:"1px solid black"}}></td>
                                   <td style={{border:"1px solid black"}}></td>
                                   <td style={{border:"1px solid black"}}></td>

                                   <td style={{border:"1px solid black",textAlign:"center",fontWeight:"bold"}}>
                                       {activeData.sgst}
                                   </td>

                               </tr>


                               {/* TOTAL */}

                               <tr>

                                   <td style={{border:"1px solid black"}}></td>

                                   <td style={{border:"1px solid black",fontWeight:"bold"}}>
                                       Total Amount
                                   </td>

                                   <td style={{border:"1px solid black"}}></td>
                                   <td style={{border:"1px solid black"}}></td>
                                   <td style={{border:"1px solid black"}}></td>

                                   <td style={{border:"1px solid black",textAlign:"center",fontWeight:"bold"}}>
                                       {activeData.subTotal}
                                   </td>

                               </tr>

                               </tbody>

                           </table>


                           {/* TOTAL SECTION */}

                           <div style={{
                               display:"grid",
                               gridTemplateColumns:"1fr 1fr",
                               gap:"12px",
                               marginTop:"20px"
                           }}>

                               <div style={{border:"1px solid black",padding:"10px"}}>

                                   <p>Total Invoice Amount in Words</p>

                                   <p style={{marginTop:"6px",fontWeight:"600"}}>
                                       {activeData.TotalInWord}
                                   </p>

                                   <p style={{marginTop:"18px",fontWeight:"600"}}>
                                       Subject to Surat Jurisdiction Only
                                   </p>

                               </div>


                               <div style={{border:"1px solid black",padding:"10px"}}>

                                   <div style={{display:"flex",justifyContent:"space-between"}}>
                                       <span>Sub Total</span>
                                       <span>{activeData.subTotal}</span>
                                   </div>

                                   <div style={{display:"flex",justifyContent:"space-between"}}>
                                       <span>CGST</span>
                                       <span>{activeData.cgst}</span>
                                   </div>

                                   <div style={{display:"flex",justifyContent:"space-between"}}>
                                       <span>SGST</span>
                                       <span>{activeData.sgst}</span>
                                   </div>

                                   <div style={{
                                       display:"flex",
                                       justifyContent:"space-between",
                                       fontWeight:"bold",
                                       borderTop:"1px solid black",
                                       marginTop:"8px",
                                       paddingTop:"6px"
                                   }}>

                                       <span>Total Amount After Tax</span>
                                       <span>{activeData.grandTotal}</span>

                                   </div>

                               </div>

                           </div>


                           <p style={{marginTop:"14px",fontWeight:"600"}}>
                               Declaration
                           </p>

                           <p style={{fontSize:"12px"}}>
                               We hereby declare that the goods mentioned in this invoice are true and correct.
                               GST charged @ 2.5% CGST and 2.5% SGST.
                           </p>


                           {/* SIGN */}

                           <div style={{
                               display:"flex",
                               justifyContent:"flex-end",
                               marginTop:"40px",
                               fontWeight:"600"
                           }}>

                               <div style={{textAlign:"center"}}>

                                   <p>For, Bansi Fashion</p>

                                   <div style={{height:"50px"}}></div>

                                   <p>Authorised Signatory</p>

                               </div>

                               <div className="qr-code"></div>

                           </div>

                       </div>
                       <div className="grid grid-cols-2 mt-6 gap-4">

                           <button
                               style={{background:"#111",color:"#fff",padding:"10px"}}
                               onClick={downloadPDF}
                           >
                               Download Invoice
                           </button>

                           <button
                               style={{background:"#ccc",padding:"10px"}}
                               onClick={()=>setElement(false)}
                           >
                               Back
                           </button>

                       </div>
                   </>
                )
            }

        </section>
    )
}
