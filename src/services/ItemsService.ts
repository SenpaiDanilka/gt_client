import {gql} from '@apollo/client';

export const DeleteItem = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      _id
    }
  }
`;

export const GetUserItems = gql`
  query FindUserByID($id: ID!) {
    findUserByID(id: $id) {
      items {
        data {
          _id
          description
          name
          type
        }
      }
    }
  }
`;
export const FindItemByID = gql`
  query FindItemByID($id: ID!) {
    findItemByID(id: $id) {
      _id
      name
      description
      type
    }
  }
`;