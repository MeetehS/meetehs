const Post = require('../models').Post

exports.count = () => Post.find().count()

exports.addPost = data => Post.create(data)

exports.updatePost = ({ id, content }) => (
  Post.findByIdAndUpdate(id, { content, modified: new Date() })
)

exports.getPostById = id => Post.findById(id)

exports.getPosts = (pageNo = 1, perPage = 10) => {
  return Post.find().skip((pageNo - 1) * perPage).limit(perPage).sort('-modified')
}
