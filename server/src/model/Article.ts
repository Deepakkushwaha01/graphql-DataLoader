import mongoose from "mongoose";
import {z} from "zod";

export const ArticleSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    createdAt: z.date(),
    authorId: z.string()
})

export type Article = z.output<typeof ArticleSchema>;



export const ArticleEntrySchema=z.object({
    title: z.string(),
    content: z.string(),
    createdAt: z.date(),
    authorId: z.string()
})


export type ArticleEntry=z.output<typeof ArticleEntrySchema>;

const ArticleMongooseSchema = new mongoose.Schema<Article>({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
});

const ArticleModel = mongoose.model<Article>('article', ArticleMongooseSchema);

export default ArticleModel;
