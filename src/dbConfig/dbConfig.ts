import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!)
    const connection = mongoose.connection;
    connection.on('connected',()=>{
        console.log('MongoDB is connect')
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