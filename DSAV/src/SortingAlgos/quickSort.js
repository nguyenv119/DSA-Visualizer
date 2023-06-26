export function getQuickSortAnimationArray(arr) {
    const animations = [];
    quickSort(arr, 0, arr.length - 1, animations)
    return animations;
}

function quickSort(array, l, r, animations) {

    function partition(arr, l, r) {
        let spot = l - 1;
        let pivot = arr[r];
    
        for (let i = l; i <= r; i++) {
            if (arr[i] < pivot) {
                spot++;
                let temp = arr[spot];
                arr[spot] = arr[i];
                arr[i] = temp;
            }
        }
        spot++;
        arr[r] = arr[spot];
        arr[spot] = pivot;
    
        return spot;
    }
    if (array == null) return null;
    if (array.length == 1) return array;

    if (l < r) {
        let pivot = partition(array, l, r);
        quickSort(array, l, pivot - 1);
        quickSort(array, pivot + 1, r);
    }
    return array
}