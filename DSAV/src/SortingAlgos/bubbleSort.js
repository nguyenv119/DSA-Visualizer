export function getBubbleSortAnimationArray(arr) {
    const animations = [];
    bubbleSort(arr, animations)
    return animations;
}

function bubbleSort(array) {
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