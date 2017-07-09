import { gql } from 'react-apollo'

export const postsQuery = gql`
  query postsQuery($pageNo: Int, $perPage: Int) {
    posts(pageNo: $pageNo, perPage: $perPage) {
      id
      content
      modified
    }
    total
  }
`
