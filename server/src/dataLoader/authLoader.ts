import DataLoader from "dataloader";
import { Services } from "services/createServices";


export const authorLoader=(context:{services: Services})=>new DataLoader(async(keys: string[])=>{
    console.log("author loader", keys)
    const authors = await  context.services.author.findByQuery({id:keys});

    const t= keys.map((key) => authors.find((author) => author._id == key));
    return t;
})