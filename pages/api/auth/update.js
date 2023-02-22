import { getSession } from "next-auth/react"
import userModel from "../../../models/User"

const handler  = async (req, res) => {
    console.log("code ran 1")
    if(req.method !== "PUT"){
        res.status(401).send({message: `${req.method} is not supported`  })
        return  
    }
  const session = await  getSession({req})
  console.log("this is session", session)
 if(!session.user){
    res.status(401).send({message: "login required"})
    return

 }
 const {
    email, name, password
 } = req.body
if ( !email || !email.includes("@") || !name || !password || password.length < 5) return res.status(401).send({message:"incorrect input format"})

 try {
     await userModel.findByIdAndUpdate(session._id, {
        ...req.body
     }, {new: true})
     res.status(200).send({message:"user successfully updated"})
    
 } catch (error) {
    res.status(500).jsoon({
        error: error
    })
 }


}

export default handler