import gql from "graphql-tag";

export const postQuery = gql`
  query postQuery($id: String) {
    post(id: $id) {
      content
      modified
    }
  }
`;
