import { default as bootstrap } from './bootstrap'
const PORT = 3000
const app = bootstrap()
app.listen({ port: PORT }, () =>{
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/graphql`)
})
