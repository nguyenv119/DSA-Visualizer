import React from "react";
import {mergeSortExp} from "../SortingAlgos/mergeSort"
import {bubbleSortExp} from "../SortingAlgos/bubbleSort"
import {selectionSortExp} from "../SortingAlgos/selectionSort"
import {insertionSortExp} from "../SortingAlgos/insertionSort"
// import {HeapSortExp} from "../SortingAlgos/heapSort"
import "./SortingVisualizer.css"

const MINVAL = 5;
const MAXVAL = 700;

/** 
 * ! need to have some formula to calculate restating of properties with
 * ! relation to BARS, ANIMATION SPEED, and TYPE OF SORTING
 */
export const BARS = 308;
export const ANIMATION_SPEED_MS = 1;
export const GREEN_SPEED = 1;
export const PRIMARY_COLOR = '#007ce8';
export const SECONDARY_COLOR = '#fe5f24';
export const SMALLER_COLOR = "#f44336";
export const LARGER_COLOR = "#50af50"
export const SAMESIZE_COLOR = "#f1cc32";
export const SMALLEST_SOFAR_COLOR = "#FC0FC0"
export const DONE_COLOR = "rgba(255, 0, 166, 0.87)";
import 'bootstrap/dist/css/bootstrap.css';

/* export default class defines the class we want to have as a tag*/
export default class SortingVisualizer extends React.Component {

    /** Called when react component is created 
     * props = properties, passed down from parent comp 
     * (component where this component is called):
    */
    constructor(props) {
        /** Gets data */
        super(props);

        /** Init the initial state of component */
        this.state = {
            array: [],
            isSorting: false,
            buttonsDisabled: false,
        };
    };

    /** Lifecycle method in React class component 
     * invoked immedientally after a component is 
     * mounted (inserted into DOM tree), rendered for the first time
     */
    componentDidMount() { 
        this.makeArray()
    }

    makeProps() {
        this.setState({ buttonsDisabled: true, isSorting: true });
        const { array } = this.state;
        const arrayBars = document.getElementsByClassName("arrayBar");
        return [array, arrayBars];
    }
 
    makeArray() {
        const array = [];
        for (let i = 0; i < BARS; i++) {
            array.push(randomIntFrom(MINVAL, MAXVAL));
        }

        /** Sets the state to be the created array
         * If we didnt have setState, we wouldnt
         * update the array we created
         */
        this.setState({ array }, () => {

            /** Resets the color of array back to PRIMARY */
            const arrayBars = document.getElementsByClassName("arrayBar");
            for (let i = 0; i < arrayBars.length; i++) {
                arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
            }
        });
        
    }

    /** For all sorting algos, we are returned an animation array, and a copy
     * of the sorted array. At the end of every animation, we set the state
     * to be the sorted array, as to not redo the animations on the unsorted array
     * if it were not replaced with the sorted array */ 
    bubbleSort() {
        let [array, arrayBars] = this.makeProps();
        let [res, arr] = bubbleSortExp(array, arrayBars);

        setTimeout(() => {
            this.setState({ array: arr, buttonsDisabled: false, isSorting: false });
        }, (res.length * 0.1) * ANIMATION_SPEED_MS);
      }

    insertionSort() {
        let [array, arrayBars] = this.makeProps();
        let [res, arr] = insertionSortExp(array, arrayBars);

        setTimeout(() => {
            this.setState({ array: arr, buttonsDisabled: false, isSorting: false });
        }, (res.length * 0.1) * ANIMATION_SPEED_MS);
    }

    selectionSort() {
        let [array, arrayBars] = this.makeProps();
        let [res, arr] = selectionSortExp(array, arrayBars);

        setTimeout(() => {
            this.setState({ array: arr, buttonsDisabled: false, isSorting: false });
        }, (res.length) * ANIMATION_SPEED_MS);
    }
    
    mergeSort() {
        let [array, arrayBars] = this.makeProps();
        let [res, arr] = mergeSortExp(array, arrayBars);

        setTimeout(() => {
            this.setState({ array: arr, buttonsDisabled: false, isSorting: false });
        }, (res.length * 1.15) * ANIMATION_SPEED_MS);
    }

    heapSort() {
        this.setState({ buttonsDisabled: true, isSorting: true });
        const {array} = this.state;
        let check = array.sort((a, b) => a - b);
        let res = getHeapSortAnimationArray(array.slice())
        this.setState({res})
        // console.log(check.every((value, index) => value === res[index]))
    }

    toggleSorting() {
        this.setState(prevState => ({
          paused: !prevState.paused
        }));
    }
        
    /** Renders components UI */
    render() {
        /** Gets the state (array we created) out of the object, 
         * We need the {}, won't work with just array
        */
        const {array, buttonsDisabled, isSorting} = this.state;
        return (
            /** Map = go through each num in array, extracting value and index
             * and making it into a bar:
             * 
             * Can put any variable name because when we call array.map, 
             * 2 parameters are returned: value and index, so the callback function
             * knows to associate.
             * 
             * ref: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_map3
             */
            <div className="arrayContainer">
                <div className = "buttons">
                    <div className="buttonLeft">
                        <button onClick={() => this.makeArray()} disabled={isSorting}>Generate New Array</button>
                        <button onClick={() => this.bubbleSort()} disabled={buttonsDisabled}>Bubble Sort</button>
                        <button onClick={() => this.selectionSort()} disabled={buttonsDisabled}>Selection Sort</button>
                        <button onClick={() => this.insertionSort()} disabled={buttonsDisabled}>Insertion Sort</button>
                        <button onClick={() => this.mergeSort()} disabled={buttonsDisabled}>Merge Sort</button>
                        <button onClick={() => this.heapSort()} disabled={buttonsDisabled}>Heap Sort</button>
                    </div>
                    <div className="scrollableRangeContainer">
                        <label for="customRange3" className="form-label">Example range</label>
                        <div className="scrollableRange">
                        <input type="range" className="form-range" min="0.25" max="6" step="0.5" id="customRange3"></input>
                        </div>
                    </div>
                    <div className="buttonRight">
                        <div className="speed">
                            Speed
                        </div>
                    </div>
                </div>
                <div className="arrayBars">
                    {array.map((value, index) => (
                    <div className = "arrayBar" 
                        key={index} 
                        style={{ 
                            backgroundColor: PRIMARY_COLOR,
                            height: `${value}px` 
                        }}>
                </div>
                    ))}
                </div>
            </div>
        );
    }
}

/* Put functions outside */

/** Generates random int from min to max */
function randomIntFrom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}