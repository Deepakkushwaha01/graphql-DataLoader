import mongoose from "mongoose"


export const db=async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/Apoll');
        console.log('database connected') 
    } catch (error) {
        console.log(error)
    }
 
}