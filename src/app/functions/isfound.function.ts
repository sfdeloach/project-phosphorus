// HELPER FUNCTION: searches an array of objects for a
// key containing any value found in the value array
export function isFound(array: any[], key: string, values: string[]): boolean {
  let result = false;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < values.length; j++) {
      if (array[i][key] === values[j]) {
        result = true;
        break;
      }
    }
    if (result) {
      break;
    }
  }
  return result;
}
