import AuthorModel, {Author, AuthorQuery, AuthorQuerySchema, AuthorSchema} from "../model/Author";
import {ulid} from 'ulid';
import {faker} from "@faker-js/faker";
import {z} from "zod";
import DataLoader from "dataloader";
import mongoose from "mongoose";
import { ObjectId } from "mongoose";

export var AUTHORS = [];

/*     async function w(){
    let a=new mongoose.Types.ObjectId("6593ecb9b9a360e635a84417")
    try {
        AUTHORS=await AuthorModel.find({_id:"6593ecb9b9a360e635a843fd"});
         console.log(AUTHORS)
    } catch (error) {
        console.log(error)
    }
    
}

w();  */


/*  for (let i = 0; i < 100; i++) {
    AUTHORS.push(AuthorSchema.parse({
        id: ulid(),
        name: faker.person.fullName(),
        createdAt: faker.date.past(),
        avatar: faker.image.avatarGitHub()
    }));
}  */

export class AuthorService {
    async findByQuery(query: AuthorQuery) {
 
        const finalQuery = AuthorQuerySchema.parse(query);

        //  const filter = computeFilterForQuery(finalQuery);
        const filters:any={}

        if(finalQuery.id){
           /*  filters._id={$in: finalQuery.id.map((id: string) => new mongoose.Types.ObjectId(id))} */
           filters._id={$in: finalQuery.id}
        }
        if(finalQuery.name){
            filters.name=finalQuery.name
        }

        try {
            const authors = await AuthorModel.find(filters)/* .skip(query.offset).limit(query.limit)  */
            ;
          
            return authors;
        } catch (error) {
            console.error("Error fetching authors:", error);
            return [];
        }

/* const objectid=finalQuery.id.map((id)=>new mongoose.Types.ObjectId(id))
console.log(objectid)
         const authors = await AuthorModel.find({ _id: { $in: objectid } }); 
            console.log(authors)
            return authors; */

            
        
//     return new Promise<Author[]>(resolve => {
//           /*   setTimeout(() => { */
//                 resolve(AUTHORS.filter(filter));
//   /*           }, 1000); */
//         }); // simulate network latency
    }

    async findById(id: string[]) {
        const authors = await this.findByQuery({id});
        return authors[0];
    }

async AddAuthor(){
    
}


}

type AuthorFilter = (author: Author) => boolean;

function computeFilterForQuery(query: z.output<typeof AuthorQuerySchema>): AuthorFilter {
    let filter: AuthorFilter = () => true;
    if (query.id) {
        filter = composeFilters<Author>(filter, author => author._id.includes(author._id));
    }
    return filter;
}

function composeFilters<T>(...filters: Array<(input: T) => boolean>) {
    return (input: T) => filters.every(filter => filter(input));
}
