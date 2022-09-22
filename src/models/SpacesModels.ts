export interface SpaceType {
  name: string;
  desc: string;
  id: string;
}

export class Space implements SpaceType {
  name
  desc
  id

  constructor({
    name = "",
    desc = "",
    id = "new"
  } = {}) {
    this.name = name;
    this.desc = desc;
    this.id = id;
  }
}