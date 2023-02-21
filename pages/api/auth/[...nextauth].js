import NextAuth from "next-auth"
import userModel from "../../../models/User";
import db from "../../../utils/db";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth(
    {
        session:{
            strategy:"jwt"
        },
        callbacks:{
            async jwt({token, user}){
              if(user?._id) token._id = user._id;
              if(user?.isAdmin) token.isAdmin = user.isAdmin;
              return token

            },
            async session({session,token}){
         
                if(token?._id) session._id = token._id;
                if(token?.isAdmin) session.isAdmin = token.isAdmin;
                return session;
              }
        },
        providers: [
            CredentialsProvider({
                async authorize(credentials){
                   
                   await db.connect()
                   const user = await userModel.findOne({
                    email: credentials.email
                   })
                   await db.disconnect()
                   if(user && credentials.password === user.password){
                 
                    return {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        image:"f"
                    }
                   }
                   throw new Error("invalid email or password")
                }
            })
        ]
    }
)