export const isRequired = (val: string) => !!val || { text: 'requiredField' }
export const isValidEmail = (val: string) =>
  /^([\w.%+-]+)@([\w-]+\.)+(\w{2,})$/i.test(val) || { text: 'invalidEmail' };
export const minLength = (val: string, length: number) =>
  val.length >= length || { text: 'minLength', additionalData: { length } };
export const maxLength = (val: string, length: number) =>
  val.length <= length || { text: 'maxLength', additionalData: { length } };

export const validator = (val: string, rules: any[]) => {
  const errors: Set<string> = new Set();
  const addError = (ruleCheck: (v: string) => true | string) => {
    const res = ruleCheck(val);
    res !== true && errors.add(res);
  }
  rules.forEach((rule) => {
    addError(rule);
  })
  return errors;
}