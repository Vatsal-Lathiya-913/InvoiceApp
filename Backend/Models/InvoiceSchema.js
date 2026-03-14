const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
    fromParty: {
        name: {type: String, required: true},
        address: {type: String, required: true},
        gst: {type: String, required: true},
        mobile: {type: String, required: true},
        email: {type: String, required: true},
        state :  {type: String, required: true},
        stateCode: {type: Number, required: true},
    },
    toParty: {
        name: {type: String, required: true},
        address: {type: String, required: true},
        gst: {type: String, required: true},
        mobile: {type: String, required: true},
        email: {type: String, required: true},
        state :  {type: String, required: true},
        stateCode: {type: Number, required: true},
    },
    billNo: {type: Number},
    invoiceDate: {type: Date,default:Date.now},
    DueDate: {type: Date, default:new Date().setDate(new Date().getDate() + 10)},
    items: [
        {
            description: {type: String, required: true},
            hsn: {type: String, required: true},
            qty: {type: Number, required: true},
            rate: {type: Number, required: true},
            amount: {type: Number},
        }
    ],
    subTotal: Number,
    cgst: Number,
    sgst: Number,
    grandTotal: Number,
    signature: String
});


InvoiceSchema.pre('save',   async function() {
    try{
        if(this.isNew){
           const counter = await this.constructor.countDocuments();
           this.billNo = counter + 101;
        }

        this.items.forEach(item => {
            item.amount = item.qty * item.rate;
        });

        this.subTotal = this.items.reduce((sum, item) => sum + item.amount, 0);
        this.cgst = parseFloat((this.subTotal * 0.025).toFixed(2));
        this.sgst = parseFloat((this.subTotal * 0.025).toFixed(2));
        this.grandTotal = parseFloat((this.subTotal + this.cgst + this.sgst).toFixed(2));
    }catch(e){
        console.log("Ërror Occured",e.message);
    }
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
