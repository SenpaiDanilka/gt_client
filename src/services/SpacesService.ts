import {Space} from "../models/SpacesModels";
import {gql} from '@apollo/client';

export const GetUserSpaces = gql`
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

export const DeleteSpace = gql`
  mutation DeleteSpace($id: ID!) {
    deleteSpace(id: $id) {
      _id
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