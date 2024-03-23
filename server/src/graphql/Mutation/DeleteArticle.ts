import { GraphQLID, GraphQLNonNull, GraphQLString, graphql } from "graphql";
import { GraphQLContext } from "graphql/createContext";
import ArticleModel from "../../model/Article";
import { ArticleReturnType } from "./CreateArticleType";



const DeleteArticleMutation = {
    type: GraphQLString, 
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (_, { id }, context: GraphQLContext) => {
      
      return context.services.article.DeleteArticle(id)

    },
  };
  
  export default DeleteArticleMutation;