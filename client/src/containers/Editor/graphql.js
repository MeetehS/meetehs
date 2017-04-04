import { gql } from 'react-apollo'

export const addPostMutation = gql`
  mutation addPost($content: String!) {
    addPost(content: $content) {
      id
      content
      modified
    }
  }
`
