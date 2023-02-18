import { getSession } from "next-auth/react";
import orderModel from "../../../../models/Order";
import db from "../../../../utils/db";

const handler = async (req, res) => {
  console.log("this is the  req body",req.body)
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).send("Error: singin required");
  }
 
  await db.connect();
  const order = await orderModel.findById(req.query.id);
  if (order) {
    if (order.isPaid) {
      return res.status(400).send({
        message: " Error: Order is already paid",
      });
    }
      order.isPaid = true; 
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        email_address: req.body.payer.email_address,
      }
      const paidOrder = await order.save();
      await db.disconnect()
      res.status(200).send({
        message: "order paid successfully", order: paidOrder
      })
    
  }else{
    await db.disconnect()
    res.status(404).send({message: "order not found"})
  }
};

export default handler