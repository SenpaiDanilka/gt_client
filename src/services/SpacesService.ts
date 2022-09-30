import {Space} from "../models/SpacesModels";

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