import { gql } from 'react-apollo'

export const addPostMutation = gql`
  mutation addPost($content: String!, $id: String) {
    addPost(content: $content, id: $id) {
      id
      content
      modified
    }
  }
`
