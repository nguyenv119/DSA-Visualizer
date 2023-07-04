import {resetAllBarColors, greenify} from "./CommonMethods/commonMethods";
import {    PRIMARY_COLOR,
            SECONDARY_COLOR,
            LARGER_COLOR,
            SMALLER_COLOR,
            SAMESIZE_COLOR,
            DONE_COLOR } from "../SortingVisualizer/SortingVisualizer";

/*
* The heapSort function we are exporting with the animation array */
export function heapSortExp(array, arrayBars, ANIMATION_SPEED_MS, comparisons, updateComparisons) {
    resetAllBarColors(arrayBars, PRIMARY_COLOR);
    const [res, arr] = getHeapSortAnimationArray(array.slice());
    animate(res, arrayBars, 0, ANIMATION_SPEED_MS, comparisons, updateComparisons);
    return [res, arr, comparisons];
}

function getHeapSortAnimationArray(arr) {
    const animations = [];
    if (arr.length <= 1) return arr;
    heapSort(arr, animations)
    return [animations, arr];
}

/* 
* Build the max heap */
function buildMaxHeap(array) {
    let heapSize = array.length;
    for (let i = Math.floor((heapSize / 2)); i >= 0; i--) {
        heapifyDown(array, i, heapSize)
    }
}
  
/*
* HeapifyDown for maxHeap DS */
function heapifyDown(arr, indx, heapSize) {
    /** If index is not a parent, return */
    if (indx >= Math.floor(heapSize / 2)) return;
    
    let left = indx * 2;
    let right = indx * 2 + 1 < heapSize ? indx * 2 + 1 : null;
    let largest;

    if (right) {
      largest = arr[left] > arr[right] ? left : right;
    } 
    else largest = left;
    
    if (arr[indx] < arr[largest]) {
        [arr[indx], arr[largest]] = [arr[largest], arr[indx]];
        heapifyDown(arr, largest, heapSize);
    }
}

/*
* The actual heapSort function */
function heapSort(array, animations) {
    buildMaxHeap(array);
    let heapSize = array.length; 
    for (let i = array.length - 1; i >= 1; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        heapSize--;
        heapifyDown(array, 0, heapSize);
    }
    console.log(`After: ${array}`)
}

/*
* heapifyUp method for maxHeap */
function heapifyUp(arr, i) {
    /** Math.floor(i / 2) is the parent */
    while (i > 0 && arr[i] > arr[Math.floor((i / 2))]) {
        [arr[i], arr[Math.floor((i / 2))]] = [arr[Math.floor((i / 2))], arr[i]];
        i = Math.floor((i/2)); // update index after swapping with parent node
    }
}

function animate(res, arrayBars, completedAnimations, ANIMATION_SPEED_MS, comparisons, updateComparisons) {

}