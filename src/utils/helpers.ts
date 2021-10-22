export function first(array: Array<ANY>): ANY {
  return array[0];
}

export function isEmpty(array: Array<ANY>): ANY {
  return !Array.isArray(array) || !array.length;
}
