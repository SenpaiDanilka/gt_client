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
      _id
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

export const GET_SPACE_ITEMS = gql`
  query GetModelItems($model: AvailabilityModel!, $model_id: String!) {
    getModelItems(model: $model, model_id: $model_id) {
      _id
      model
      model_id
      item {
        _id
        name
        description
      }
    }
  }
`;

export const DELETE_ITEM_FROM_SPACE = gql`
  mutation DeleteAvailableItem($id: ID!) {
    deleteAvailableItem(id: $id) {
      _id
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
  mutation CreateItem($name: String!, $description: String!, $type: ItemType!, $owner: String!) {
    createItem(name: $name, description: $description, type: $type, owner: $owner) {
      _id
      name
      description
      type
    }
  }
`;

export const CREATE_AVAILABLE_ITEM = gql`
  mutation CreateAvailableItem($model: AvailabilityModel!, $model_id: String!, $item_id: String!) {
    createAvailableItem(model: $model, model_id: $model_id, item_id: $item_id) {
      _id
      model
      model_id
      item {
        _id
        type
        name
        description
      }
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation UpdateItem($id: ID!, $data: ItemInput!) {
    updateItem(id: $id, data: $data) {
      _id
      name
      description,
      type
    }
  }
`;