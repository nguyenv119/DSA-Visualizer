import {resetAllBarColors, greenify} from "./CommonMethods/commonMethods";
import {    PRIMARY_COLOR,
            SECONDARY_COLOR,
            LARGER_COLOR,
            SMALLER_COLOR,
            SAMESIZE_COLOR,
            DONE_COLOR } from "../SortingVisualizer/SortingVisualizer";

/*
* The heapSort function we are exporting with the animation array 
! We have to animate the buildMaxHeap and sorting differently, since they both use heapifyDown, 
! but we have different animations 
*/
export function heapSortExp(array, arrayBars, ANIMATION_SPEED_MS, comparisons, updateComparisons) {
    resetAllBarColors(arrayBars, PRIMARY_COLOR);
    const [maxHeapAnimations, heapSortAnimations, arr] = getHeapSortAnimationArray(array.slice());
    animateMaxHeap(maxHeapAnimations, arrayBars, 0, ANIMATION_SPEED_MS, comparisons, updateComparisons);
    animateHeapSort(heapSortAnimations, arrayBars, ANIMATION_SPEED_MS, comparisons, updateComparisons);
    return [maxHeapAnimations, heapSortAnimations, arr];
}

function getHeapSortAnimationArray(arr) {
    if (arr.length <= 1) return arr;
    const maxHeapAnimations = [];
    const heapSortAnimations = [];
    heapSort(arr, maxHeapAnimations, heapSortAnimations);
    return [maxHeapAnimations, heapSortAnimations, arr];
}

/* 
* Build the max heap */
function buildMaxHeap(array, maxHeapAnimations) {
    let heapSize = array.length;
    for (let i = Math.floor((heapSize / 2)); i >= 0; i--) {
        heapifyDownMax(array, i, heapSize, maxHeapAnimations)
    }
}
  
/*
* HeapifyDown for building maxHeap DS */
function heapifyDownMax(arr, idx, heapSize, maxHeapAnimations) {
    /** If index is not a parent, return */
    if (idx >= Math.floor(heapSize / 2)) return;
    
    /** 0-indexing maxHeap, if idx has no right child, set it to null */
    let left = idx * 2 + 1;
    let right = idx * 2 + 2 < heapSize ? idx * 2 + 2 : null;
    let largest;

    /** Initial comparison */ 
    maxHeapAnimations.push([idx, left, right]);
    /** Colorise, guaranteed the 0'th index is the largest one = green */
    if (right) {
        largest = arr[left] > arr[right] ? left : right;
        if (largest === left) maxHeapAnimations.push([largest, idx, right]);
        else if (largest === right) maxHeapAnimations.push([largest, idx, left])
    } 
    else {
        /** Just colorise two, and swap two */
        largest = left;
        maxHeapAnimations.push([largest, left]);
    }

    /** Switch heights (only the parent and largest), pass in values */
    maxHeapAnimations.push([arr[idx], arr[largest]]);
    /** Switch back colors to PRIMARY, do i + 1 */
    maxHeapAnimations.push([]);

    if (arr[idx] < arr[largest]) {
        [arr[idx], arr[largest]] = [arr[largest], arr[idx]];
        heapifyDownMax(arr, largest, heapSize, maxHeapAnimations);
    }
}

/*
* HeapifyDown for sorting */
function heapifyDownSort(arr, idx, heapSize, heapSortAnimations, swapEnds) {
    if (idx >= Math.floor(heapSize / 2)) return;
    
    let left = idx * 2 + 1;
    let right = idx * 2 + 2 < heapSize ? idx * 2 + 2 : null;
    let largest;

    /** Need to swap ends */
    if (swapEnds) {
        /** Highlight ends */
        heapSortAnimations.push([0, heapSize]);
        /** Switch ends, keep secondary colors */
        heapSortAnimations.push([arr[0], arr[heapSize]]);
    } else {
        /** Fillers, we can just skip to heapifyDown */
        heapSortAnimations.push([]);
        heapSortAnimations.push([]);
    }
    /** Heapify down */
    heapSortAnimations.push([idx, left, right]);
    if (right) {
      largest = arr[left] > arr[right] ? left : right;
      if (largest === left) heapSortAnimations.push([largest, idx, right]);
      else if (largest === right) heapSortAnimations.push([largest, idx, left])
    } 
    else {
        heapSortAnimations.push([largest, left]);
        largest = left;
    }

    heapSortAnimations.push([]);
    heapSortAnimations.push([arr[idx], arr[largest]]);
    heapSortAnimations.push([]);
    
    if (arr[idx] < arr[largest]) {
        [arr[idx], arr[largest]] = [arr[largest], arr[idx]];
        /** Since we don't need to swapEnds anymore */
        heapifyDownSort(arr, largest, heapSize, heapSortAnimations, false);
    }
}

/*
* The actual heapSort function */
function heapSort(array, maxHeapAnimations, heapSortAnimations) {
    buildMaxHeap(array, maxHeapAnimations);
    let heapSize = array.length - 1; 
    for (let i = heapSize; i >= 1; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        /** Initially pass in true, that we need to swap ends */
        heapifyDownSort(array, 0, heapSize, heapSortAnimations, true);
        heapSize--;
    }
    console.log(`${array}`);
}


/*
 ! Build MAXHEAP ANIMATION
 * 0: We highlight the 3 bars to compare the indices(index, left, right)
 * 1: Highlight the largest one GREEN, the rest RED
 * 2: Switch heights, and keeping the color of the heights before
 * 3: back to primary, do i + 1 timing
 */
function animateMaxHeap(maxHeapAnimations, completedAnimations, arrayBars, ANIMATION_SPEED_MS, comparisons, updateComparisons) {
    for (let i = 0; i < maxHeapAnimations.length; i++) {
        const stage = i % 4;

        if (stage === 0) {
            const [barOneIdx, barTwoIdx, barThreeIdx] = maxHeapAnimations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;    
            const barThreeStyle = arrayBars[barThreeIdx].style;    
            setTimeout(() => {
                barOneStyle.backgroundColor = SECONDARY_COLOR;
                barTwoStyle.backgroundColor = SECONDARY_COLOR;
                barThreeStyle.backgroundColor = SECONDARY_COLOR;
                completedAnimations++;
              }, (i) * ANIMATION_SPEED_MS);
        }
        /* 
        ? heapSortAnimations.push([arr[indx], arr[largest]]); */
        else if (stage === 1) {
            const [largestIdx, smaller1Idx, smaller2Idx] = maxHeapAnimations[i];
            const largestStyle = arrayBars[largestIdx].style;
            const smaller1Style = arrayBars[smaller1Idx].style;    
            const smaller2Style = arrayBars[smaller2Idx].style;    
            setTimeout(() => {
                largestStyle.backgroundColor = LARGER_COLOR;
                smaller1Style.backgroundColor = SMALLER_COLOR;
                smaller2Style.backgroundColor = SMALLER_COLOR;
                updateComparisons(comparisons + 1);
                comparisons++
                completedAnimations++;
              }, (i) * ANIMATION_SPEED_MS);
        }
        /* 
        ? heapSortAnimations.push([arr[indx], arr[largest]]); */
        else if (stage === 2) {

        }
        else {

        }
    }
}

/*
 ! HeapSort Animation
 * 0:  
 ? a) Sometimes, we already swapped, so no need to swap initially: []
 ? b) Every heapifyDown in sorting (not maxHeap) we switch ends: highlight ends
 * 1:
 ? a) IGNORE
 ? b) Swap end values bars
 * 2: Highlight 3 bars to compare the indices(index, left, right)
 * 3: Highlight the largest one GREEN, the rest RED
 * 4: Switch heights, and keeping the color of the heights before
 * 5: back to primary, do i + 1 timing
*/
function animateHeapSort(heapSort, arrayBars, ANIMATION_SPEED_MS, comparisons, updateComparisons) {
}