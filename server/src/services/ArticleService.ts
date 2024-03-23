import {PaginationInput, QueryInput} from "../model/PaginationMeta";
import ArticleModel, {Article, ArticleEntry, ArticleSchema} from "../model/Article";
import {AUTHORS} from "./AuthorService";
import {faker} from "@faker-js/faker";
import {ulid} from "ulid";
import mongoose from "mongoose";
import AuthorModel from "model/Author";


var ARTICLES: Article[] = [];

/*    async function w(){
    try {
         ARTICLES=await ArticleModel.find({_id:"6594023c5d4c4f62e42706ec"});
   console.log(ARTICLES)
    } catch (error) {
        console.log(error)
    }
    
}
w()  ;  */
 
/* for (let i = 0; i < 1000; i++) {
    ARTICLES.push(
        ArticleSchema.parse({
            id: ulid(),
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs(3),
            createdAt: faker.date.past(),
            authorId: getRandomAuthorId() 
        })
    )
} */

/* ARTICLES.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); */

export class ArticleService {
    async findByQuery(query: QueryInput) {

           /* return ARTICLES.slice(query.offset, query.offset + query.limit); */

        const filters:any={};

  if(query.title){
        filters.title=query.title 
     } 

return await ArticleModel.find(filters).skip(query.offset).limit(query.limit) 

}

   async findTotalCount() {
      
        return await ArticleModel.countDocuments();
    }

async SaveArticle(query:ArticleEntry){

    const {title, content, createdAt, authorId}=query;

    const newArticle= new ArticleModel({
        title,
        content,
        createdAt,
        authorId
    })

    const savedArticle = await newArticle.save();
    return savedArticle;

}


async DeleteArticle(id:String){

    try {
   
        const articleToDelete = await ArticleModel.findById(id);
  
        if (!articleToDelete) {
          throw new Error("Article not found");
        }
  
       
        await ArticleModel.findByIdAndDelete(id);
  
        return `Article with ID ${id} has been successfully deleted`; 
      } catch (error) {
        console.error("Error deleting article:", error);
        throw new Error("Could not delete article");
      }

}

}

function getRandomAuthorId() {
    return faker.helpers.arrayElement(AUTHORS).id;
}
