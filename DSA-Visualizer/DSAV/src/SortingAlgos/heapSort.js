import {resetAllBarColors, greenify} from "../SortingAlgos/CommonMethods/commonMethods";
import {    PRIMARY_COLOR,
            SECONDARY_COLOR,
            LARGER_COLOR,
            SMALLER_COLOR,
            SAMESIZE_COLOR,
            DONE_COLOR } from "../SortingVisualizer/SortingVisualizer";

/** The heapSort function we are exporting with the animation array */
export function heapSortExp(array, arrayBars, ANIMATION_SPEED_MS) {
    resetAllBarColors(arrayBars, PRIMARY_COLOR);
    const [res, arr] = getHeapSortAnimationArray(array.slice());
    animate(res, arrayBars, 0, BARS - 1, ANIMATION_SPEED_MS);
    return [res, arr];
}

function getHeapSortAnimationArray(arr) {
    const animations = [];
    if (arr.length <= 1) return arr;
    heapSort(arr, animations)
    return [animations, arr];
}

/** Actual heapSort function */
function heapSort(array, animations) {

}

function animate(res, arrayBars, completedAnimations, ANIMATION_SPEED_MS) {

}