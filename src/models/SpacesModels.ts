export interface SpaceType {
  name: string;
  description: string;
  id: string;
}

export class Space implements SpaceType {
  name
  description
  id

  constructor({
    name = "",
    description = "",
    id = "new"
  } = {}) {
    this.name = name;
    this.description = description;
    this.id = id;
  }
}