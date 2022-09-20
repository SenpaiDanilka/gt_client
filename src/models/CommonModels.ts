export type ValidationError = {
  text: string,
  additionalData?: object
}

export type ValidationFunction = (
  v: string,
  length?: number
) => ValidationError | true;

export interface FormDataType {
  [K: string]: { value: string, errors: ValidationError[] };
}