import { GraphQLClient } from "graphql-request";
import { subgraphUrl } from "./constants";

export const graphqlClient = new GraphQLClient(subgraphUrl, { headers: {} });