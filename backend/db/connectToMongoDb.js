import mongoose from "mongoose";

const conncetToMongoDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Connected To Mongo Db")
    }catch(error){
        console.log("Unable to connect to database",error)
    }
}

export default conncetToMongoDb