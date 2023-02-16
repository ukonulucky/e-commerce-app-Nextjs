import { getSession } from "next-auth/react"
import orderModel from "../../../models/Order"
import db from "../../../utils/db"

const handler = async (req, res) => {
  const session = await getSession({req})
 console.log("this is the req frm server", req.body)
  if(!session){
    return res.status(401).send("signin required")
  }
 
  

await db .connect();
const newOrder = new orderModel( {
        ...req.body,
        user: session._id
    
    }
)

const order = await newOrder.save()
res.status(201).send(order)

}
export default handler