import express from 'express';
import InvoiceSchema from '../Models/InvoiceSchema.js';
import invoiceSchema from "../Models/InvoiceSchema.js";
const app = express();
const Route = express.Router();

const validationGST = (gst) => {
    if(!gst){
        return false;
    }else{
        gst = gst.toUpperCase();
        const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
        return regex.test(gst);
    }
}


Route.post('/invoice/generate',async (req,res)=>{
        const invoice = new InvoiceSchema(req.body);

        if(!validationGST(invoice.fromParty.gst)) {
            return res.status(400).json({ error: 'From Party GST Invalid' });
        }

        if(!validationGST(invoice.toParty.gst)) {
            return res.status(400).json({ error: 'To Party GST Invalid' });
        }

        if(invoice.fromParty.gst === invoice.toParty.gst){
            return res.status(400).json({ error: 'From and To Party do not same GST Please Check it' });
        }

        if(!invoice.fromParty.email.includes("@") || !invoice.toParty.email.includes("@")) {
            return res.status(400).json({ error: 'Email must contain a valid email address' });
        }

        await invoice.save();

        // 4️⃣ Return saved invoice
        res.status(201).json({
            invoice:invoice
        });
})

Route.post('/invoice/data',async (req,res)=>{
    const invoice = await InvoiceSchema.find();
    if(!invoice){
        return res.status(404).json({ error: 'Invoice Not Available' });
    }else{
        return res.status(200).json(invoice);
    }
})

Route.delete('/invoice/:id',async (req,res)=>{
   try {
       const id = req.params.id;
       const invoice = await invoiceSchema.deleteOne({_id: id});
       if(!invoice){
           res.status(404).json({ error: 'Invoice Not Found' });
       }
       res.json({
           message: 'Invoice Deleted',
       });
   }catch(e){
        res.status(400).json({ error: 'Insert Invalid invoice' });
   }
})

export default Route;