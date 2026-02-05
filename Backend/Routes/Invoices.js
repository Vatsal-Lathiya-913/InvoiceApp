import express from 'express';
import InvoiceSchema from '../Models/InvoiceSchema.cjs';
import router from "./Auth.js";
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

        await invoice.save();

        // 4️⃣ Return saved invoice
        res.status(201).json({
            status: "OK",
            message: "Invoice generated successfully",
            invoice
        });
})

export default Route;