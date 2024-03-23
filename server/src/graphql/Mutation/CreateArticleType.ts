import { GraphQLNonNull, GraphQLString, GraphQLInputObjectType, GraphQLObjectType, GraphQLID } from "graphql";
import { GraphQLDate } from "graphql-compose";
import { ArticleType } from "../types/ArticleType";
import { GraphQLContext } from "graphql/createContext";
import AuthorModel, { ArticleEntrySchema } from "../../model/Article";



const ArticleInputType = new GraphQLInputObjectType({
    name: 'ArticleInputType',
    fields: {
        title: { type:new GraphQLNonNull(GraphQLString) }, 
        content: { type:new GraphQLNonNull(GraphQLString) }, 
        createdAt: { type:new  GraphQLNonNull(GraphQLDate) }, 
        authorId: { type:new GraphQLNonNull(GraphQLID) }
    },
  });


 export const ArticleReturnType = new GraphQLObjectType({
    name: 'ArticleReturnType',
    fields: () => ({
      id: { type:new GraphQLNonNull(GraphQLID) },
      title: { type:new GraphQLNonNull(GraphQLString) },
      content: { type:new GraphQLNonNull(GraphQLString) },
      createdAt: { type:new GraphQLNonNull(GraphQLDate) }, 
      authorId: { type:new GraphQLNonNull(GraphQLID) }
    }),
  });




export default {
type:ArticleReturnType,
args:{
    input: { type: new GraphQLNonNull(ArticleInputType) }
},
resolve:async (_,args:any,context:GraphQLContext)=>{
try {
    const query=ArticleEntrySchema.parse(args.input);
return await context.services.article.SaveArticle(query)



} catch (error) {
    console.error("Error saving article:", error);
    throw new Error("Could not save article");
}
}

}


