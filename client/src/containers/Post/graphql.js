import { gql } from 'react-apollo'

export const postQuery = gql`
  query postQuery($id: String) {
    post(id: $id) {
      content
      modified
    }
  }
`
