import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
      me {
          _id
          username
          email
          SavedBooks {
              bookId
              authors
              image
              link
              title
              description
          }
      }
  }
`;

export const QUERY_BOOKS = gql`
  query books {
    books {
      _id
      authors
      description
      bookId
      image
      link
      title
    }
  }
`;