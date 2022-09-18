export interface ItemType {
  name: string;
  photo?: string;
  desc: string;
  type: string;
  id: string;
}

export class Item implements ItemType {
  name
  photo
  desc
  type
  id

  constructor({
    name = "",
    photo = "",
    desc = "",
    type = "",
    id = "new"
 } = {}) {
    this.name = name;
    this.photo = photo;
    this.desc = desc;
    this.type = type;
    this.id = id;
  }
}