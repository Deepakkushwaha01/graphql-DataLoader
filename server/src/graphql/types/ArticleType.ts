import {ObjectTypeComposer, GraphQLDate} from 'graphql-compose'
import {GraphQLID, GraphQLNonNull, GraphQLString} from 'graphql';
import {GraphQLContext} from "../createContext";
import {Article} from "../../model/Article";
import { AuthorType } from './AutherType';

export const ArticleType = ObjectTypeComposer.createTemp<Article, GraphQLContext>({
    name: 'Article',
    fields: {
        _id: new GraphQLNonNull(GraphQLID),
        title: new GraphQLNonNull(GraphQLString),
        content: new GraphQLNonNull(GraphQLString),
        createdAt: new GraphQLNonNull(GraphQLDate),
        author:{
            type: AuthorType,
            resolve: async (source, args, context:GraphQLContext ) => {
                const authorId = source.authorId; 
                console.log("articleResolver")
                const author = await context.dataLoader.authorLoader.load(authorId);
             
                return author;
            },
            projection: { authorId: true }, 
        }
    }
})


/* ArticleType.addResolver({
    name:'resolveauthor',
    type: AuthorType,
    resolve: async({source,args,context}) => {
        const authorId = source.authorId; 
        console.log(authorId)
        const author = await context.services.author.findById(authorId);
        return author;
    },
    projection: { authorId: true },
}) */


