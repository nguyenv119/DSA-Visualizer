import { GREEN_SPEED } from "../../SortingVisualizer/SortingVisualizer";

/** Resets the color of the array before sorting back to PRIMARY */
export function resetColors(PRIMARY_COLOR) {
    const arrayBars = document.getElementsByClassName("arrayBar");
    for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
      }
}


/** Checks and changes the arrayBars to green if sorted. 
 * All animations completed, now gradually turn bars green 
 * By incrementing the greenIndex each time we make a bar green, 
 * we can see when we reach the end
*/
export function checkGreen(completedAnimations, res, arrayBars) {
    if (completedAnimations === res.length) {
        let greenIndex = 0;
        const greenInterval = setInterval(() => {
            arrayBars[greenIndex].style.backgroundColor = SMALLER_COLOR;
            greenIndex++;

            if (greenIndex === arrayBars.length) {
            clearInterval(greenInterval);
            this.setState({ buttonsDisabled: false, isSorting: false });
            }
        }, GREEN_SPEED);
    }
}