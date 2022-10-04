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

export const CREATE_ITEM = gql`
  mutation CreateItem($name: String!, $description: String!, $type: ItemType!, $owner: String! ) {
    createItem(name: $name, description: $description, type: $type, owner: $owner) {
      _id
      name
      description
      type
    }
  }
`;