export function bubbleSortExp(array) {
    let didSwap = true;
    let i = array.length
    while (didSwap && i > 0) {
        didSwap = false;
        for (let j = 0; j < i; ++j) {
            if (array[j] > array[j + 1]) {
                didSwap = true;
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
        i--;
    }
    return array;
}
export function selectionSortExp(array) {
    return array
}
export function insertionSortExp(array) {
    return array
}
export function quickSortExp(array) {
    return array
}
export function mergeSortExp(array) {
    return array
}
export function heapSortExp(array) {
    return array
}