import {createServices} from "./services/createServices";
import {createContext} from "./graphql/createContext";
import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {schema} from './graphql/schema';
import mongoose from "mongoose";
/* import { db } from "./DB/Database"; */

const services = createServices();

/* db(); */

export const db=async()=>{
    try {
     await mongoose.connect('mongodb+srv://deepak:EU1pGKSuL0G98F1n@cluster0.md4x7ja.mongodb.net/Graphql_Apollo');
        console.log('database connected') 
        
        const server = new ApolloServer({
            schema,
        });

        startStandaloneServer(server, {
            listen: {
                port: 5000
            },
            async context() {
                return createContext(services);
            }
        })
            .then(({url}) => {
                console.log(`🚀 Server ready at ${url}`);
            })
        


    } catch (error) {
        console.log(error)
    }
 
}

db()



