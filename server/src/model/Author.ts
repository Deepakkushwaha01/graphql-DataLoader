import mongoose from "mongoose";
import {z} from "zod";

export const AuthorSchema = z.object({
    _id: z.string(),
    name: z.string(),
    createdAt: z.date(),
    avatar: z.string().url()
})

export type Author = z.output<typeof AuthorSchema>;

export const AuthorQuerySchema = z.object({
    id: z.array(z.string()).nullish(),
    name:z.string().optional(),
    limit: z.number().int().positive().default(10),
    offset: z.number().int().min(0).default(0),

});

export type AuthorQuery = z.input<typeof AuthorQuerySchema>;


const AuthorMongooseSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    avatar:{
        type:String,
required:true        
    }
})

const AuthorModel = mongoose.model<Author>('authors', AuthorMongooseSchema);

export default AuthorModel;