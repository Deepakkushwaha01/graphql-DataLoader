import {SchemaComposer} from "graphql-compose";

import {ArticleListType} from "./types/ArticleListType";
import AuthorModel from "model/Author";
import articleCreate from "./Mutation/CreateArticleType";
import authorCreate from "./Mutation/CreateAuthorType"
import DeleteArticleMutation from "./Mutation/DeleteArticle";

export function createSchema() {
    const composer = new SchemaComposer();

    composer.Query.addFields({
        articleList: ArticleListType.getResolver('findByQuery'),
        
    })

    composer.Mutation.addFields({
        articleCreate:articleCreate,
        authorCreate:authorCreate,
        DeleteArticle:DeleteArticleMutation
    })

    return composer.buildSchema();
}



/* articleCreate:{
    name:"article",
    type:'',
    args:{

    },
    resolve:()=>null
 } */