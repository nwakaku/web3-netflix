import { ApolloCache, InMemoryCache } from "@apollo/client";

const client = new ApolloCache({
  uri: "https://api.thegraph.com/subgraphs/name/nwakaku/web3-netflix",
  cache: new InMemoryCache(),
});

export default client;