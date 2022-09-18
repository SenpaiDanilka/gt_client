export type ValidationRule = {
  text: string,
  additionalData?: object
}

export interface FormDataType {
  [K: string]: { value: string, errors: string[] };
}