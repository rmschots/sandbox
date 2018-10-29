export function sortByKey<T>(array: T[], key: string): T[] {
  return array.sort((a, b) => {
    const keyA = a[key].toLowerCase();
    const keyB = b[key].toLowerCase();

    if (keyA < keyB) {
      return -1;
    }

    if (keyA > keyB) {
      return 1;
    }

    return 0;
  });
}

export function sortByKeyNumbers<T>(array: T[], key: string): T[] {
  return array.sort((a, b) => {
    const keyA = a[key];
    const keyB = b[key];

    if (keyA < keyB) {
      return -1;
    }

    if (keyA > keyB) {
      return 1;
    }

    return 0;
  });
}
