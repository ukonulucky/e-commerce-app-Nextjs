import mongoose from "mongoose"

const connection = {}

const MONGODB_URL = process.env.MONGODB_URL

async function connect(){
  if(connection.isConnect){
console.log("already connected")
return
}

if(mongoose.connections.length > 0){
  connection.isConnected = mongoose.connections[0].readyState;
  if(connection.isConnected === 1){
    console.log("use previous connection")
    return
  }
  await mongoose.disconnect()
}

const db = await mongoose.connect(MONGODB_URL)
console.log("new connection")

connection.isConnect = db.connections[0].readyState
}

async function disconnect(){
    if(connection.isConnect){
        if(process.env.NODE_ENV === 'production'){
            await mongoose.disconnect;
            connection.isConnect = false
        }else{
            console.log("not connected")
        }
    }
}

const db = {
    connect, disconnect
}

export default db