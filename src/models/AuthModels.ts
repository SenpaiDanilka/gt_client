export interface UserType {
  name: string;
  photo?: string;
  email: string;
  items_count: number;
  spaces_count: number;
  contacts_count: number;
  id: string;
}

export class User implements UserType {
  name
  photo
  email
  items_count
  spaces_count
  contacts_count
  id

  constructor({
    name = "Name",
    photo = "",
    email = "",
    items_count = 0,
    spaces_count = 0,
    contacts_count = 0,
    id = "id"
  } = {}) {
    this.name = name;
    this.photo = photo;
    this.email = email;
    this.items_count = items_count;
    this.spaces_count = spaces_count;
    this.contacts_count = contacts_count;
    this.id = id;
  }
}