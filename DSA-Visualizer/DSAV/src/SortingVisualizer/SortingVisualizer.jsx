import React from "react";
import {mergeSortExp} from "../SortingAlgos/mergeSort"
import {bubbleSortExp} from "../SortingAlgos/bubbleSort"
import {selectionSortExp} from "../SortingAlgos/selectionSort"
import {insertionSortExp} from "../SortingAlgos/insertionSort"
import {heapSortExp} from "../SortingAlgos/heapSort"
import 'bootstrap/dist/css/bootstrap.css';

const MINVAL = 5;
const MAXVAL = 650;
export var BARS = 150;
export var ANIMATION_SPEED_MS = 6;
export const GREEN_SPEED = 1;
export const PRIMARY_COLOR = '#007ce8';
export const SECONDARY_COLOR = '#fe5f24';
export const SMALLER_COLOR = "#f44336";
export const LARGER_COLOR = "#50af50"
export const SAMESIZE_COLOR = "#f1cc32";
export const SMALLEST_SOFAR_COLOR = "#FC0FC0"
export const DONE_COLOR = "rgba(255, 0, 166, 0.87)";



                                    /* 
                                    TODO:

                                    ! Like the animation speed, make the bars dependent on how many bars there are,
                                    ! using predictable steps in the HTML and 
                                    * ? : formatting

                                    ? Also, need to fix ability to change length while animating,
                                    ? also need to make speed accessible during animating
                                    ? also need to do heapSort
                                    */




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
            ANIMATION_SPEED_MS: 6, 
            BARS: 100, 
        };
    };

    /** Lifecycle method in React class component 
     * invoked immedientally after a component is 
     * mounted (inserted into DOM tree), rendered for the first time
     */
    componentDidMount() { 
        this.makeArray()
    }

    /** Create properties before sorting: arrayBars, array, and speed*/
    makeProps() {
        this.setState({ buttonsDisabled: true, isSorting: true });
        const arrayBars = document.getElementsByClassName("arrayBar");
        const { array, ANIMATION_SPEED_MS } = this.state;
        const speed = ANIMATION_SPEED_MS === 10?
        1 : ANIMATION_SPEED_MS === 8 ?
            4 : ANIMATION_SPEED_MS === 6 ?
                10 : ANIMATION_SPEED_MS === 4 ?
                    100 : ANIMATION_SPEED_MS === 2 ?
                        500 : ANIMATION_SPEED_MS === 0 ?
                            1000 : 3000;
        
        return [array, arrayBars, speed];
    }
 
    /** Create the array, including how many bars and how wide */
    makeArray() {
        const { BARS } = this.state;
        const array = [];
        for (let i = 0; i < BARS; i++) {
            array.push(randomIntFrom(MINVAL, MAXVAL));
        }

        /** Sets the state to be the created array and the Bars.
         * If we didnt have setState, we wouldnt
         * update the array we created
         */
        this.setState({ array, BARS }, () => {
            
            /** Resets the color of array back to PRIMARY, and determines width and length */            
            const arrayBars = document.getElementsByClassName("arrayBar");
            for (let i = 0; i < arrayBars.length; i++) {
                arrayBars[i].style.width = `${777 / BARS}px`;
                arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
            }
        });
    }

    /** For all sorting algos, we are returned an animation array, and a copy
     * of the sorted array. At the end of every animation, we set the state
     * to be the sorted array, as to not redo the animations on the unsorted array
     * if it were not replaced with the sorted array */ 
    bubbleSort() {
        let [array, arrayBars, ANIMATION_SPEED_MS] = this.makeProps();
        let [res, arr] = bubbleSortExp(array, arrayBars, ANIMATION_SPEED_MS);

        setTimeout(() => {
            this.setState({ array: arr, buttonsDisabled: false, isSorting: false });
        }, (res.length) * ANIMATION_SPEED_MS);
    }

    selectionSort() {
        let [array, arrayBars, ANIMATION_SPEED_MS] = this.makeProps();
        let [res, arr] = selectionSortExp(array, arrayBars, ANIMATION_SPEED_MS);

        setTimeout(() => {
            this.setState({ array: arr, buttonsDisabled: false, isSorting: false });
        }, (res.length) * ANIMATION_SPEED_MS);
    }

    insertionSort() {
        let [array, arrayBars, ANIMATION_SPEED_MS] = this.makeProps();
        let [res, arr] = insertionSortExp(array, arrayBars, ANIMATION_SPEED_MS);

        setTimeout(() => {
            this.setState({ array: arr, buttonsDisabled: false, isSorting: false });
        }, (res.length) * ANIMATION_SPEED_MS);
    }
    
    mergeSort() {
        let [array, arrayBars, ANIMATION_SPEED_MS] = this.makeProps();
        let [res, arr] = mergeSortExp(array, arrayBars, ANIMATION_SPEED_MS);

        setTimeout(() => {
            this.setState({ array: arr, buttonsDisabled: false, isSorting: false });
        }, (res.length * 1.15) * ANIMATION_SPEED_MS);
    }

    heapSort() {
        let [array, arrayBars, ANIMATION_SPEED_MS] = this.makeProps();
        let [res, arr] = heapSortExp(array, arrayBars, ANIMATION_SPEED_MS);

        setTimeout(() => {
            this.setState({ array: arr, buttonsDisabled: false, isSorting: false });
        }, (res.length) * ANIMATION_SPEED_MS);
    }
    
    /** Updates the animation speed */
    handleAnimationSpeedChange = (e) => {
        const newSpeed = parseInt(e.target.value);
        this.setState({ ANIMATION_SPEED_MS: newSpeed });
    };
      
    /** Updates the number of bars and their width */  
    handleBarsChange = (e) => {
        this.setState({ BARS: parseInt(e.target.value) }, () => {
            this.makeArray();
        });
    };
      
        
    /** Renders components UI */
    render() {
        /** Gets the state (array we created) out of the object, 
         * We need the {}, won't work with just array
        */
        const { array, buttonsDisabled, isSorting, ANIMATION_SPEED_MS, BARS } = this.state;
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
                <div className="buttons">
                    <div className="buttonGroup">
                        <div className="btn-container">
                            <button className = "btn-3d regular" onClick={() => this.makeArray()} disabled={isSorting}>Generate New Array</button>
                        </div>
                        <div className="btn-container">
                            <button className = "btn-3d regular" onClick={() => this.bubbleSort()} disabled={buttonsDisabled}>Bubble Sort</button>
                        </div>
                        <div className="btn-container">
                            <button className = "btn-3d regular" onClick={() => this.selectionSort()} disabled={buttonsDisabled}>Selection Sort</button>
                        </div>
                        <div className="btn-container">
                            <button className = "btn-3d regular" onClick={() => this.insertionSort()} disabled={buttonsDisabled}>Insertion Sort</button>
                        </div>
                        <div className="btn-container">
                            <button className = "btn-3d regular" onClick={() => this.mergeSort()} disabled={buttonsDisabled}>Merge Sort</button>
                        </div>
                        <div className="btn-container">
                            <button className = "btn-3d regular" onClick={() => this.heapSort()} disabled={buttonsDisabled}>Heap Sort</button>
                        </div>
                    </div>
                </div>
                <div className="settings">
                    <div className="scrollableRangeContainer">
                        <label for="customRange3" className="form-label"></label>
                        <div className="scrollableRange">
                            <input
                                type="range"
                                className="form-range"
                                min="0"
                                max="10"
                                step="2"
                                id="customRange3"
                                value={ANIMATION_SPEED_MS}
                                onChange={this.handleAnimationSpeedChange}
                            ></input>
                        </div>
                    </div>
                    <div className="btn-3d regular colorful speed">
                        Speed
                    </div>
                    <div className="scrollableRangeContainer">
                        <label for="customRange4" className="form-label"></label>
                        <div className="scrollableRange">
                            <input
                                type="range"
                                className="form-range"
                                min="5"
                                max="308"
                                step="25"
                                id="customRange4"
                                value={BARS}
                                onChange={this.handleBarsChange}
                            ></input>
                        </div>
                    </div>
                    <div className="colorful btn-3d regular length">
                        Array Length
                    </div>
                </div>
                <div className="arrayBars">
                    {array.map((value, index) => (
                    <div
                        className="arrayBar"
                        key={index}
                        style={{
                        backgroundColor: PRIMARY_COLOR,
                        height: `${value}px`
                        }}
                    ></div>
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