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
export function insertionSortExp(array) {
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
export function quickSortExp(array, l, r) {

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
export function mergeSortExp(array, l, r) {

    function merge(arr, l, m, r) {
        if (arr == null) return null;
    
        let leftSize = (m - l) + 1;
        let rightSize = r - m;
        
        const L = Array.from({ length: leftSize });
        const R = Array.from({ length: rightSize });
    
        for (let i = 0; i < leftSize; i++) L[i] = arr[l + i];
        for (let i = 0; i < rightSize; i++) R[i] = arr[m + i + 1];
    
        let index = l;
        let i = 0; 
        let j = 0;
    
        while (i < leftSize && j < rightSize) {
            if (L[i] < R[j]) arr[index++] = L[i++];
            else arr[index++] = R[j++];
        }
    
        while (i < leftSize) arr[index++] = L[i++];
        while (j < rightSize) arr[index++] = R[j++];
    
        return arr;
    }
    if (array == null) return null;
    if (array.length == 1) return array;
    if (l < r) {
        let m = Math.floor((l + r) / 2);
        mergeSortExp(array, l, m);
        mergeSortExp(array, m + 1, r);
        merge(array, l, m, r);
    }
    return array
}

export function heapSortExp(array) {
    return array
}