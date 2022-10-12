import {gql} from '@apollo/client';

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: ID!) {
    deleteContact(id: $id) {
      _id
    }
  }
`;

export const CREATE_CONTACT = gql`
  mutation CreateContact($owner: String!, $user: String!) {
    createContact(owner: $owner, user: $user) {
      _id,
      owner {
        _id
        name
      }
      user {
        _id
        name
      }
    }
  }
`;

export const GET_USER_CONTACTS = gql`
  query FindUserContactsByID($id: ID!) {
    findUserByID(id: $id) {
      contacts {
        data {
          _id
          user {
            _id
            name
          }
        }
      }
    }
  }
`;

export const FIND_USER_BY_EMAIL = gql`
  query FindUserByEmail($email: String!) {
    findUserByEmail(email: $email) {
      _id
      name
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: String!) {
    getUserById(id: $id) {
      name
      email
      spaces_count
      items_count
      contacts_count
    }
  }
`;