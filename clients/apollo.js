import { ApolloClient as Apollo, InMemoryCache } from "@apollo/client";

const ApolloClient = new Apollo({
  uri: "https://api.thegraph.com/subgraphs/name/nwakaku/web3-netflix",
  cache: new InMemoryCache(),
});

export default ApolloClient;