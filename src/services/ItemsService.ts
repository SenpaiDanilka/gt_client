import {gql} from '@apollo/client';

export const DELETE_ITEM = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      _id
    }
  }
`;

export const GET_USER_ITEMS = gql`
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
export const FIND_ITEM_BY_ID = gql`
  query FindItemByID($id: ID!) {
    findItemByID(id: $id) {
      _id
      name
      description
      type
    }
  }
`;