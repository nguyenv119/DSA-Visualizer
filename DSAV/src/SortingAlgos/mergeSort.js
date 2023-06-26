/**
 * The idea of the animations array is that some indices will have
 * arrays of [index, indexOther], while some will have [index, value].
 * 
 * This is because sometimes, we want to animate comparing two indices, 
 * not necesarilly swapping values yet: the former. When we swap values, 
 * the latter is used
 */
export function getMergeSortAnimationArray(arr) {
    const animations = [];
    copy = arr.splice();
    mergeSort(arr, 0, arr.length - 1, copy, animations)
    return animations;
}

function mergeSort(array, l, r, copy, animations) {

    function merge(mainArr, l, m, r, copy, animations) {
        if (mainArr == null) return null;
    
        let leftSize = (m - l) + 1;
        let rightSize = r - m;

        let index = l;
        let i = 0; 
        let j = 0;
    
        while (i < leftSize && j < rightSize) {
            /** When we compare two indices, we will
             * change the color of the bars to another color.
             * Then, when we finish, we switch back the colors.
             * That is why we add twice to animations
             */
            animations.push([i, j])
            animations.push([i, j])

            if (copy[i] < copy[j]) {
                /** We have guaranteed that the i'th element
                 * is smaller than the j'th. Therefore we are
                 * replicating the swapping in the mainArray
                 * in the animationArray:
                 * 
                 * --> "index" is the index we have sorted so far.
                 * So we replace the index's index with the new height.
                 * 
                 * Why a replacement and not a swap? 
                 * Take auxiliary array [1, 3, 5, 2, 4, 6] = [1, 3, 5], [2, 4, 6]
                 * When we merge and compare the two auxilary arrays, all 
                 * we need to do is replace the original array with the value in
                 * the auxiliary one, and we are guaranteed that every element will be
                 * readded
                 * 
                 */
                animations.push([index, copy[i]])
                mainArr[index++] = copy[i++];
            }
            else {
                animations.push([index, copy[j]])
                mainArr[index++] = copy[j++];
            }
        }
    
        while (i < leftSize) {
            animations.push([i, i]);
            animations.push([i, i]);
            mainArr[index++] = copy[i++];
            mainArr[index++] = copy[i++];
        }
        while (j < rightSize) {
            animations.push([j, j]);
            animations.push([j, j]);
            mainArr[index++] = copy[j++];
            mainArr[index++] = copy[j++];
        }
    
        return mainArr;
    }

    if (array == null) return null;
    if (array.length == 1) return array;

    if (l == r) return;
    if (l < r) {
        let m = Math.floor((l + r) / 2);
        mergeSort(array, l, m, copy, animations);
        mergeSort(array, m + 1, r, copy, animations);
        merge(array, l, m, r, copy, animations);
    }
    return array
}