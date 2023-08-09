import mongoose from "mongoose";

let isConnected = false; // track connection status

export const connectToDB = async() => {
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log('Mongo is already connected')
        return
    }
    try {
        await mongoose.connect(process.env.DB_URL, {
            dbName: 'share_prompt',
            useNewUrlParser: true,
            // useUnifiedToplogy: true
        })
        isConnected = true;
        console.log('mongodb connected');
    } catch (error) {
        console.log(error)
    }
}