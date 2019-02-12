export function copyValueObject(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
