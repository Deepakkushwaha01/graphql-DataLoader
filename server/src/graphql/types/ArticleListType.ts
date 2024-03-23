import {ObjectTypeComposer} from "graphql-compose";
import {ArticleType} from "./ArticleType";
import {PaginationMetaType} from "./PaginationMetaType";
import {GraphQLID, GraphQLInt, GraphQLString} from "graphql";
import {PaginationInputSchema, QuerySchema} from "../../model/PaginationMeta";
import { AuthorType } from "./AutherType";



export const ArticleListType = ObjectTypeComposer.createTemp({
    name: 'ArticleList',
    fields: {
        nodes: ArticleType.NonNull.List.NonNull,
        meta: PaginationMetaType.NonNull,
        author:AuthorType.NonNull.List.NonNull
    }
});

ArticleListType.addResolver({
    name: 'findByQuery',
    type: ArticleListType.NonNull,
    args: {
        limit: {
            type: GraphQLInt,
            defaultValue: 2,

        },
        offset: GraphQLInt,
        title: GraphQLString,
       name:GraphQLString
    },
    resolve: async ({args, context}) => {

       /*  const query = PaginationInputSchema.parse(args); */
console.log(args)
       const query = QuerySchema.parse(args);

/*  */
        return {
            nodes: await context.services.article.findByQuery(query) ,
            author:await context.services.author.findByQuery(query),
            meta: {
                total: context.services.article.findTotalCount(),
                limit: query.limit,
                offset: query.offset
            }
        }
    }
});
