export function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(" ");
}

export function enumToKeysArray(val: any) {
  return Object.keys(val).filter((v) => isNaN(Number(v)));
}