const { Post } = require('./services')

const resolvers = {
  Query: {
    posts: (_, { pageNo, perPage }) => Post.getPosts(pageNo, perPage),
    total: () => Post.count(),
  },
  Mutation: {
    addPost: (_, { content }) => Post.addPost({ content }),
  },
}

module.exports = {
  resolvers,
}
