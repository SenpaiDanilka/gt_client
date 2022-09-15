export interface FormDataType {
  [K: string]: { value: string, errors: string[] };
}

export interface UserType {
  name: string;
  photo?: string;
  email: string;
  items_count: number;
  spaces_count: number;
  contacts_count: number;
}

export class User implements UserType {
  name
  photo
  email
  items_count
  spaces_count
  contacts_count

  constructor({
    name = "Name",
    photo = "",
    email = "",
    items_count = 0,
    spaces_count = 0,
    contacts_count = 0
  } = {}) {
    this.name = name;
    this.photo = photo;
    this.email = email;
    this.items_count = items_count;
    this.spaces_count = spaces_count;
    this.contacts_count = contacts_count;
  }
}