import { getSession } from "next-auth/react";
import orderModel from "../../../models/Order";
import db from "../../../utils/db";

const handler = async (req, res) => {
  try {
    const session = getSession({ req });
    if (!session) return res.status(401).json("please sign in");
    await db.connect();
    const user = await orderModel.findById(req.query.id);
    console.log("use found", user)
    await db.disconnect();
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message)
  }
};


export default handler