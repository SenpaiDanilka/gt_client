import {gql} from '@apollo/client';

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: ID!) {
    deleteContact(id: $id) {
      _id
    }
  }
`;

export const CREATE_CONTACT = gql`
  mutation CreateContact($user_one: String!, $user_two: String!) {
    createContact(user_one: $user_one, user_two: $user_two) {
      _id
      user_one {
        _id
        name
      }
      user_two {
        _id
        name
      }
      status
    }
  }
`;

export const PARTIAL_UPDATE_CONTACT = gql`
  mutation PartialUpdateContact($id: ID!, $data: PartialUpdateContactInput!) {
    partialUpdateContact(id: $id, data: $data) {
      _id
      status
      user_one {
        _id
        name
      }
      user_two {
        _id
        name
      }
    }
  }
`;

export const GET_CONTACTS_BY_USER_ID = gql`
  query GetContactsByUserId($user_id: String!) {
    getContactsByUserId(user_id: $user_id) {
      _id
      status
      user_one {
        _id
        name
      }
      user_two {
        _id
        name
      }
    }
  }
`;

export const GET_SENT_CONTACT_REQUESTS = gql`
  query GetSentContactRequests($user_id: String!) {
    getSentContactRequests(user_id: $user_id) {
      _id
      status
      user_one {
        _id
        name
      }
      user_two {
        _id
        name
      }
    }
  }
`;

export const GET_INCOMING_CONTACT_REQUESTS = gql`
  query GetIncomingContactRequests($user_id: String!) {
    getIncomingContactRequests(user_id: $user_id) {
      _id
      status
      user_one {
        _id
        name
      }
      user_two {
        _id
        name
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
      contact_requests_count
    }
  }
`;