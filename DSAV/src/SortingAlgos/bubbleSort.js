/**
 * When comparing two indices add twice to the animations to 
 * animate SECONDARY then switch back.
 * 
 * If we switch, if the element is smaller than the compared element, 
 * the element bubbling up should turn into a different color: TERTIARY
 * --> There, we should pass in the indices and the new heights of the two
 * swapped elements
 */
export function getBubbleSortAnimationArray(arr) {
    const animations = [];
    bubbleSort(arr, animations)
    return animations;
}

function bubbleSort(array, animations) {
    let didSwap = true;
    let i = array.length
    while (didSwap && i > 0) {
        didSwap = false;
        for (let j = 0; j < i; ++j) {
            animations.push([j, j + 1])
            animations.push([j, j + 1])
            if (array[j] > array[j + 1]) {
                didSwap = true;
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                animations.push([j + 1, array[j]])
                animations.push([j, array[j + 1]])
            }
        }
        i--;
    }
}