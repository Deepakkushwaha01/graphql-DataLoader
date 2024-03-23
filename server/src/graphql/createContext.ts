import { createDataLoader } from "../dataLoader/createDataLoader";
import {Services} from "../services/createServices";

export function createContext(services: Services) {
    return {
        services,
        dataLoader:createDataLoader(services)
    };
}

export type GraphQLContext = ReturnType<typeof createContext>;
