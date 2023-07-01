import {resetAllBarColors, greenify} from "../SortingAlgos/CommonMethods/commonMethods";
import { ANIMATION_SPEED_MS, 
            PRIMARY_COLOR,
            SECONDARY_COLOR,
            LARGER_COLOR,
            SMALLER_COLOR,
            SAMESIZE_COLOR,
            DONE_COLOR } from "../SortingVisualizer/SortingVisualizer";

/** The insertionSort function we are exporting with the animation array */
export function insertionSortExp(array, arrayBars) {
    resetAllBarColors(arrayBars, PRIMARY_COLOR);        
    const [res, arr] = getInsertionSortAnimationArray(array.slice());
    animate(res, arrayBars, 0);
    return [res, arr];
}

function getInsertionSortAnimationArray(arr) {
    const animations = [];
    if (arr.length <= 1) return arr;
    insertionSort(arr, animations)
    return [animations, arr];
}

/** The actual insertionSort */
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

/** Animates insertionSort */
function animate(res, arrayBars, completedAnimations) {

}