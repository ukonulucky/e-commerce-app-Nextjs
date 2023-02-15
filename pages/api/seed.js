import productModel from "../../models/Product"
import userModel from "../../models/User"
import data from "../../utils/data"
import db from "../../utils/db"


const handler = async (req,res) => {
 try {
    await db.connect()
    await userModel.deleteMany({})
    await userModel.create(data.users)
    await productModel.deleteMany({})
    await productModel.create(data.products)
    await db.disconnect()
    res.send({
        message:"seed successfully created"
    })
 } catch (error) {
    console.log(error.message)
 }
  
}

export default handler