import { getSession } from "next-auth/react";
import orderModel from "../../../models/Order";
import db from "../../../utils/db";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("signin required");
  }

  await db.connect();


  const itemToBeCreated = req.body.orderItems.map((i) => {
    return {
      name: i.name,
      image: i.image,
      price: i.price,
      quantity: i.quantity,
     
    };
  });
  console.log("this is the session id", session._id);
  const orderList = await orderModel.find({
    user: session._id,
  }, { orderItems:{
    $elemMatch:{
      itemToBeCreated
    }
  }

  });
 
  // console.log("this is the request", req.body);
  

 
  console.log("this is the new item created", itemToBeCreated);
  console.log("this is the new item orderList", orderList);

/*
  if (allOrders.length > 0) {
    console.log("code ran inner");
    const newList = allOrders.filter((item) => {
     if (
         item.length === itemToBeCreated.length &&
         item.toString() === itemToBeCreated.toString()
        ) {
          return item;
        }
    });
    if (newList.length > 0) {
      console.log("duplicate order found", newList);
    }
 
  }
  
   */

  const newOrder = new orderModel({
    ...req.body,
    user: session._id,
  });

  const order = await newOrder.save();
  res.status(201).send(order);
};
export default handler;
