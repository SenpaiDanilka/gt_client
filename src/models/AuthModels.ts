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