export function getSelectionSortAnimationArray(arr) {
    const animations = [];
    selectionSort(arr, animations)
    return animations;
}

function selectionSort(array, animations) {
    if (array == null) return null;
    if (array.length == 1) return array;

    for (let i = 0; i < array.length - 1; i++) {
        let min = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[min]) min = j;
        }
        if (min != i) {
            let temp = array[min];
            array[min] = array[i];
            array[i] = temp;
        }
    }
    return array
}