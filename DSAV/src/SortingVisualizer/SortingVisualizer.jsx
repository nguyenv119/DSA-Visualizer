import React from "react";
import "./SortingVisualizer.css"
import {bubbleSortExp, selectionSortExp, insertionSortExp, quickSortExp, mergeSortExp, heapSortExp} from "../SortingAlgos/SortingAlgos.jsx"

// import 'bootstrap/dist/css/bootstrap.css';
{/* export default class defines the class we want to have as a tag*/}
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
        };
    };

    /** Lifecycle method in React class component 
     * invoked immedientally after a component is 
     * mounted (inserted into DOM tree), rendered for the first time
     */
    componentDidMount() { 
        this.makeArray()
    }
 
    makeArray() {
        const array = [];
        for (let i = 0; i < 310; i++) {
            array.push(randomIntFrom(5, 750));
        }

        /** Sets the state to be the created array
         * If we didnt have setState, we wouldnt
         * update the array we created
         */
        this.setState({array})
    }

    bubbleSort() {
        const {array} = this.state;

        /** Sorts the array in the order of a, b: 
         * 
         * If a - b < 0, then a should be before b
         * If a - b > 0, then a should be after b
         * If a - b = 0, don't swap
         */
        let check = array.sort((a, b) => a - b);
        let res = bubbleSortExp(array);

        /** Checks the JSX sorted array with our sorted array:
         * 
         * Goes through every value and index and checks if the value of the 
         * JSX array is the same as the index of our sorted array
         */
        console.log(check.every((value, index) => value === res[index]));
    }

    selectionSort() {
        const {array} = this.state;
        let check = array.sort((a, b) => a - b);
        let res = selectionSortExp(array)
        console.log(check.every((value, index) => value === res[index]))
    }

    insertionSort() {
        const {array} = this.state;
        let check = array.sort((a, b) => a - b);
        let res = insertionSortExp(array)
        console.log(check.every((value, index) => value === res[index]))
    }

    quickSort() {
        const {array} = this.state;
        let check = array.sort((a, b) => a - b);
        let res = quickSortExp(array)
        console.log(check.every((value, index) => value === res[index]))
    }

    mergeSort() {
        const {array} = this.state;
        let check = array.sort((a, b) => a - b);
        let res = mergeSortExp(array)
        console.log(check.every((value, index) => value === res[index]))
    }

    heapSort() {
        const {array} = this.state;
        let check = array.sort((a, b) => a - b);
        let res = heapSortExp(array)
        console.log(check.every((value, index) => value === res[index]))
    }

    /** Renders components UI */
    render() {
        /** Gets the state (array we created) out of the object, 
         * We need the {}, won't work with just array
        */
        const {array} = this.state;
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
                <div className="arrayBars">
                    {array.map((value, index) => (
                    <div className="arrayBar" key={index} style={{ height: `${value}px` }}></div>
                    ))}
                </div>
                <div className="buttons">
                    <button onClick={() => this.makeArray()}>Generate New Array</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.selectionSort()}>Selection Sort</button>
                    <button onClick={() => this.insertionSort()}>Insertion Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                </div>
            </div>
        );
    }
}

/** Put functions outside component */

/** Generates random int from min to max */
function randomIntFrom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
