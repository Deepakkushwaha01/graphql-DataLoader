import {ObjectTypeComposer, GraphQLDate} from 'graphql-compose'
import {GraphQLID, GraphQLNonNull, GraphQLString} from 'graphql';
import {GraphQLContext} from "../createContext";
/* import {Article} from "../../model/Article"; */
import { Author } from 'model/Author';

export const AuthorType = ObjectTypeComposer.createTemp<Author, GraphQLContext>({
    name: 'Author',
    fields: {
        _id: new GraphQLNonNull(GraphQLID),
        name: new GraphQLNonNull(GraphQLString),
        avatar: new GraphQLNonNull(GraphQLString),
        createdAt: new GraphQLNonNull(GraphQLDate),
    }
})
