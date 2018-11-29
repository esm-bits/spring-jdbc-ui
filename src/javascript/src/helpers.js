export function copyValueObject (obj) {
  return JSON.parse(JSON.stringify(obj))
}
