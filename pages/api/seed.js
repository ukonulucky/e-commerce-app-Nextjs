import userModel from "../../models/User"
import data from "../../utils/data"
import db from "../../utils/db"


const handler = async (req,res) => {
 try {
    await db.connect()
    await userModel.create(data.users)
    await db.disconnect()
    res.send({
        message:"seed successfully created"
    })
 } catch (error) {
    console.log(error.message)
 }
  
}

export default handler