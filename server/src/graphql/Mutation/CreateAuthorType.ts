import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import { GraphQLDate } from "graphql-compose";
import { AuthorType } from "../types/AutherType";
import { GraphQLContext } from "graphql/createContext";
import AuthorModel from "../../model/Author";

const AuthorInputType=new GraphQLInputObjectType({
    name:"AuthorInputType",
    fields:{
        name: { type:new GraphQLNonNull(GraphQLString) }, 
        avatar: { type:new GraphQLNonNull(GraphQLString) }, 
        createdAt:{ type:new  GraphQLNonNull(GraphQLDate) },
    }
})


export default {
    type:AuthorType,
    args:{
        input:{type :new GraphQLNonNull(AuthorInputType)}
    },
    resolve:async(_,args:any,context:GraphQLContext)=>{
try {
    const {name,createdAt,avatar}=args.input;

const Author=new AuthorModel({
    name,createdAt,avatar
})

const savedAuthor=await Author.save();

return savedAuthor

} catch (error) {
    console.error("Error saving article:", error);
    throw new Error("Could not save article");
}

    }
}