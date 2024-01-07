function merge(firstHalf, secondHalf) {
  const result = [];
  while (firstHalf.length && secondHalf.length) {
    if (firstHalf[0] < secondHalf[0]) {
      result.push(firstHalf.shift());
    } else {
      result.push(secondHalf.shift());
    }
  }
  return [...result, ...firstHalf, ...secondHalf];
}

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }
  const half = Math.floor(array.length / 2);
  const firstHalf = array.slice(0, half);
  const secondHalf = array.slice(half);
  return merge(mergeSort(firstHalf), mergeSort(secondHalf));
}
