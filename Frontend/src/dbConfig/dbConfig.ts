import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(`mongodb://127.0.0.1:27017/LakshyaX`)
    const connection = mongoose.connection;
    connection.on('connected',()=>{
        console.log('MongoDB is connected')
    })
    connection.on('error',(err)=>{
        console.log('Mongodb connection error, please make sure db is up and running');
        console.log(err)
        process.exit();
    })
} catch (error) {
    console.log('something went wrong in connecting to DB');
    console.log(error);
}
}