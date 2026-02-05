import mongoose from 'mongoose';

const DBConnection = async (MongoURI) => {
    try{
        mongoose.set("bufferCommands",false);

        await mongoose.connect(MongoURI,{
            dbName:"BSFashion",
        })

        console.log("Connected to MongoDB");
    }catch(err){
        console.log("Failed to connect to MongoDB",err);
        process.exit(1);
    }
};

export default DBConnection;