import { buildSchema } from 'graphql'
const typeDefs = buildSchema(`
  type Query {
    Hello: String
    GetFolders: [FSPart]
  }
 

  type FSPart {
    id: String
    label: String
    children: [FSPart]
  }
`)
export default typeDefs 