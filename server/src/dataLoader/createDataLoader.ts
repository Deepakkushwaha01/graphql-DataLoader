import { Services } from "services/createServices"
import { authorLoader } from "./authLoader"

export const createDataLoader = (services: Services)=>{
   return{
    authorLoader:authorLoader({
        services
    })
   } 
}