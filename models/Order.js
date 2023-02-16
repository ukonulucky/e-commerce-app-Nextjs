import mongoose from "mongoose";

const orderSchema= new mongoose.Schema({
   user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
   },
   orderItems: [
    {
        name:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        quantity:{ type:Number,
            required:true,
}
    }
   ],
   shippingAddress:{
    fullName:{ type:String, required:true},
    address: {type:String, required:true},
    city: {type:String, required:true},
    postCode: {type:String, required:true},
    country: {type:String, required:true},

   },
   paymentMethod:{type:String, required:true},
   itemPrice:{type:Number, required:true},
   shippingPrice:{type:Number, required:true},
   taxPrice:{type:Number, required:true},
   totalPrice:{type:Number, required:true},
   isPaid:{type:Boolean, required:true, default:false},
   isDelivered:{type:Boolean, required:true, default:false},
   paidAt:{type:Date},
   deliveredAt:{type:Date} 

}, {
    timestamps:true,
})

const orderModel =  mongoose.models.order || mongoose.model("order", orderSchema)

export default orderModel