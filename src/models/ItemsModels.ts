export enum ItemType {
  VEHICLE,
  REAL_ESTATE,
  ELECTRONICS,
  OTHER,
}

export class Item {
  name
  photo
  description
  type
  id

  constructor({
    name = "",
    photo = "",
    description = "",
    type = "",
    id = "new"
 } = {}) {
    this.name = name;
    this.photo = photo;
    this.description = description;
    this.type = type;
    this.id = id;
  }
}