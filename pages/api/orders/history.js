import { getSession } from "next-auth/react";
import orderModel from "../../../models/Order"
import db from "../../../utils/db"

const handler = async (req, res) => {
    
try {
    const session = await getSession({req})
    if(!session) {
        console.log("code ran at session: ")
        return   res.status(401).send({
            message:"Signin Required"
        })
        
    }
    await db.connect()
console.log("code ran in server session")    
    const orders = await orderModel.find({
        user: session._id
    })
    console.log("orders", orders)
    if(orders.length > 0){
        res.status(200).json(orders)
    } else{
        throw new Error("no roders made")
    }
    db.disconnect()
 
} catch (error) {  
    console.log(error.message)
    res.status(401).json({ error: error })
}
}

export default handler