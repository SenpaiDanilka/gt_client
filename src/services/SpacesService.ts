import {gql} from '@apollo/client';

export const GET_USER_SPACES = gql`
  query FindUserSpacesByID($id: ID!) {
    findUserByID(id: $id) {
      _id
      spaces {
        data {
          _id
          description
          name
        }
      }
    }
  }
`;

export const DELETE_SPACE = gql`
  mutation DeleteSpace($id: ID!) {
    deleteSpace(id: $id) {
      _id
    }
  }
`;

export const CREATE_SPACE = gql`
  mutation CreateSpace($name: String!, $description: String!, $owner: String! ) {
    createSpace(name: $name, description: $description, owner: $owner) {
      _id
      name
      description
    }
  }
`;

export const FIND_SPACE_BY_ID = gql`
  query FindSpaceByID($id: ID!) {
    findSpaceByID(id: $id) {
      _id
      name
      description
      contacts {
        data {
          _id
          contact {
            _id
            user {
              _id
              name
            }
          }
        }
      }
    }
  }
`;

export const UPDATE_SPACE = gql`
  mutation UpdateSpace($id: ID!, $data: SpaceInput!) {
    updateSpace(id: $id, data: $data) {
      _id
      name
      description
    }
  }
`;

export const CREATE_SPACE_CONTACT_LINK = gql`
  mutation CreateSpaceContactLink($data: SpaceContactLinkInput!) {
    createSpaceContactLink(data: $data) {
      _id
      contact {
        _id
        user {
          _id
          name
        }
      }
    }
  }
`;

export const DELETE_SPACE_CONTACT_LINK = gql`
  mutation DeleteSpaceContactLink($id: ID!) {
    deleteSpaceContactLink(id: $id) {
      _id
    }
  }
`;