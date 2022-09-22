import {Space} from "../models/SpacesModels";

const SpacesService = {
  getItem(id: string) {
    return new Promise<Space>((resolve, reject) => {
      resolve({
        name: 'Service Item',
        desc: 'Some very important desc',
        id: id
      })
    });
  }
}

export default SpacesService;