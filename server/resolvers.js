const { Post } = require('./services')

const resolvers = {
  Query: {
    posts: (_, { pageNo, perPage }) => Post.getPosts(pageNo, perPage),
    post: (_, { id }) => Post.getPostById(id),
    total: () => Post.count(),
  },
  Mutation: {
    addPost: (_, { content, id }) => {
      if (id) {
        return Post.updatePost({ content, id })
      } else {
        return Post.addPost({ content })
      }
    },
  },
}

module.exports = {
  resolvers,
}
