export function getInsertionSortAnimationArray(arr) {
    const animations = [];
    insertionSort(arr, animations)
    return animations;
}

function insertionSort(array, animations) {
    if (array == null) return null;
    if (array.length == 1) return array;

    for (let i = 1; i < array.length; i++) {
        let j = i - 1;
        while (j >= 0 && array[j + 1] < array[j]) {
            let temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
            j--;
        }
    }
    return array;
}