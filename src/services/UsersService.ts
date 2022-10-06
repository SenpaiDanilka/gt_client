import {gql} from '@apollo/client';

export const CREATE_CONTACT = gql`
  mutation CreateContact($owner: String!, $user: String!) {
    crateContact(owner: $owner, user: $user) {
      owner
      user
    }
  }
`;

export const GET_USER_CONTACTS = gql`
  query FindUserByID($id: ID!) {
    findUserByID(id: $id) {
      contacts {
        data {
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