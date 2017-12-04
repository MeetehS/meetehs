import gql from "graphql-tag";

export const postsQuery = gql`
  query postsQuery($pageNo: Int, $perPage: Int) {
    posts(pageNo: $pageNo, perPage: $perPage) {
      id
      content
      modified
    }
    total
  }
`;
