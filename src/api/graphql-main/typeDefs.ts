const { gql } = require('apollo-server-express')
const typeDefs = gql`
  type Query {
    Hello: String
    GetFolders: [FSPart]
  }
  type Subscription {
    Test: String
  }
 

  type FSPart {
    id: String
    label: String
    children: [FSPart]
  }
`
export default typeDefs 