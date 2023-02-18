import userModel from "../../../models/User";
import db from "../../../utils/db";


const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }
  const { name, email, password } = req.body;
  if (
    !name ||
    !email ||
    !email.includes("@") ||
     password.trim().length < 6
  ) {
    res.status(402).json({
      message: "Validation error",
    });
    return;
  }

try {
    await db.connect()
   const existingUser = await userModel.findOne({
    email
   })
   if(existingUser){
    console.log("code ran 44")
    res.status(202).json({
        message: 'User already exists'
    })
    await db.disconnect()
    return
   }
   const createUser = await userModel.create({
    name, email, password
  })
  res.status(201).json({
    message: 'User created',
  _id: createUser._id,
  name: createUser.name,
  email: createUser.email,
  isAdmin: createUser.isAdmin
  })
  await db.disconnect()



} catch (error) {
    console.log(error.message)
}
};

export default handler