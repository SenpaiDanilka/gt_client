import {Item} from "../models/ItemsModels";

const ItemsService = {
  getItem(id: string) {
    return new Promise<Item>((resolve, reject) => {
      resolve({
        name: 'Service Item',
          desc: 'Some very important desc',
        type: 'Some type',
        id: id,
        photo: ''
      })
    });
  }
}

export default ItemsService;