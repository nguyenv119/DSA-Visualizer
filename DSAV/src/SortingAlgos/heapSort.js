import {resetColors, greenify} from "../SortingAlgos/CommonMethods/commonMethods";
import { ANIMATION_SPEED_MS, 
            PRIMARY_COLOR,
            SECONDARY_COLOR,
            LARGER_COLOR,
            SMALLER_COLOR,
            SAMESIZE_COLOR,
            DONE_COLOR } from "../SortingVisualizer/SortingVisualizer";

export function getHeapSortAnimationArray(arr) {
    const animations = [];
    heapSort(arr, animations)
    return animations;
}

export function heapSort(array) {
    return array
}