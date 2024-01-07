function binarySearch(array, elementToFind, start = 0, end = array.length - 1) {
  if (start > end) {
    return 'Element is not on the array!';
  }
  const midpoint = Math.floor((start + end) / 2);
  if (array[midpoint] === elementToFind) {
    return `The element ${elementToFind} is at index ${midpoint}`;
  }
  if (array[midpoint] > elementToFind) {
    return binarySearch(array, elementToFind, start, midpoint - 1);
  }
  if (array[midpoint] < elementToFind) {
    return binarySearch(array, elementToFind, midpoint + 1, end);
  }
}
