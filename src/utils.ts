const hasOwnProperty = Object.prototype.hasOwnProperty;

export function same(x: any, y: any) {
  if (x === y) {
    return true;
  } else {
    return x !== x && y !== y;
  }
}

export function shallowEqual(objA: object, objB: object): boolean {
  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  /* tslint:disable-next-line prefer-for-of */
  for (let i = 0; i < keysA.length; i++) {
    if (
      !hasOwnProperty.call(objB, keysA[i]) ||
      !same(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }
  return true;
}