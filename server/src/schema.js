const { makeExecutableSchema } = require('graphql-tools')

const { resolvers } = require('./resolvers')

const typeDefs = `
  type Post {
     id: ID!
     content: String
     modified: String
  }

  type Query {
     posts(pageNo: Int, perPage: Int): [Post]
     total: Int
  }

  type Mutation {
    addPost(content: String!): Post
  }
`

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = { schema }
