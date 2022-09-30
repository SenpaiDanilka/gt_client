import {ValidationFunction, ValidationError} from "../models/CommonModels";

export const isRequired = (val: string) => !!val || { text: 'requiredField' }
export const isValidEmail = (val: string) =>
  /^([\w.%+-]+)@([\w-]+\.)+(\w{2,})$/i.test(val) || { text: 'invalidEmail' };
export const minLength = (val: string, length: number) =>
  val.length >= length || { text: 'minLength', additionalData: { length } };
export const maxLength = (val: string, length: number) =>
  val.length <= length || { text: 'maxLength', additionalData: { length } };

export const validator = (val: string, rules: ValidationFunction[] = []) => {
  const errors: Set<ValidationError> = new Set();
  const addError = (ruleCheck: ValidationFunction) => {
    const res = ruleCheck(val);
    res !== true && errors.add(res);
  }
  rules.forEach((rule) => {
    addError(rule);
  })
  return errors;
}