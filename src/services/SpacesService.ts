import {Space} from "../models/SpacesModels";
import {gql} from '@apollo/client';

export const GET_USER_SPACES = gql`
  query FindUserByID($id: ID!) {
    findUserByID(id: $id) {
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
    }
  }
`;

const SpacesService = {
  getItem(id: string) {
    return new Promise<Space>((resolve, reject) => {
      resolve({
        name: 'Service Item',
        description: 'Some very important description',
        id: id
      })
    });
  }
}

export default SpacesService;