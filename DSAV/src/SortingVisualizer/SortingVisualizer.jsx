import React from "react";
import {getMergeSortAnimationArray} from "../SortingAlgos/mergeSort"
import {getBubbleSortAnimationArray} from "../SortingAlgos/bubbleSort"
import {getHeapSortAnimationArray} from "../SortingAlgos/heapSort"
import {getQuickSortAnimationArray} from "../SortingAlgos/quickSort"
import {getSelectionSortAnimationArray} from "../SortingAlgos/selectionSort"
import {getInsertionSortAnimationArray} from "../SortingAlgos/insertionSort"
import "./SortingVisualizer.css"

const MINVAL = 5;
const MAXVAL = 730;
const ANIMATION_SPEED_MS = 1;
const GREEN_SPEED = 3;
const PRIMARY_COLOR = 'rgb(88, 118, 255)';
const SECONDARY_COLOR = 'red';
const BARS = 310;

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
            isSorting: false,
            paused: false,
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

    bubbleSort() {
        this.setState({ buttonsDisabled: true, isSorting: true });
        const {array} = this.state;

        /** Sorts the array in the order of a, b: 
         * 
         * If a - b < 0, then a should be before b
         * If a - b > 0, then a should be after b
         * If a - b = 0, don't swap
         */
        // let check = array.sort((a, b) => a - b);
        let res = getBubbleSortAnimationArray(array);

        /** Checks the JSX sorted array with our sorted array:
         * 
         * Goes through every value and index and checks if the value of the 
         * JSX array is the same as the index of our sorted array
         */
        this.setState({res})
        // console.log(check.every((value, index) => value === res[index]));
    }

    selectionSort() {
        this.setState({ buttonsDisabled: true, isSorting: true });
        const {array} = this.state;
        // let check = array.sort((a, b) => a - b);
        let res = getSelectionSortAnimationArray(array)
        this.setState({res})
        // console.log(check.every((value, index) => value === res[index]))
    }

    insertionSort() {
        this.setState({ buttonsDisabled: true, isSorting: true });
        const {array} = this.state;
        // let check = array.sort((a, b) => a - b);
        let res = getInsertionSortAnimationArray(array)
        this.setState({res})
        // console.log(check.every((value, index) => value === res[index]))
    }

    quickSort() {
        this.setState({ buttonsDisabled: true, isSorting: true });
        const {array} = this.state;
        // let check = array.sort((a, b) => a - b);
        let res = getQuickSortAnimationArray(array)
        this.setState({res})
        // console.log(check.every((value, index) => value === res[index]))
    }

    mergeSort() {
        this.setState({ buttonsDisabled: true, isSorting: true });
        const { array } = this.state;
        const res = getMergeSortAnimationArray(array);
        const arrayBars = document.getElementsByClassName("arrayBar");
        let completedAnimations = 0;
      
        /** Reset array bar colors */
        for (let i = 0; i < arrayBars.length; i++) {
          arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
        }
      
        /** Go through all the animations */
        for (let i = 0; i < res.length; i++) {
          const isColorChange = i % 3 !== 2;
      
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = res[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
              completedAnimations++;
      
              if (completedAnimations === res.length) {
                /** All animations completed, now gradually turn bars green 
                By incrementing the greenIndex each time we make a bar green, 
                we can see when we reach the end
                */
                let greenIndex = 0;
                const greenInterval = setInterval(() => {
                  arrayBars[greenIndex].style.backgroundColor = "limegreen";
                  greenIndex++;
      
                  if (greenIndex === arrayBars.length) {
                    clearInterval(greenInterval);
                    this.setState({ buttonsDisabled: false, isSorting: false });
                  }
                }, GREEN_SPEED);
              }
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = res[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
              completedAnimations++;
      
              if (completedAnimations === res.length) {
                let greenIndex = 0;
                const greenInterval = setInterval(() => {
                  arrayBars[greenIndex].style.backgroundColor = "limegreen";
                  greenIndex++;
      
                  if (greenIndex === arrayBars.length) {
                    clearInterval(greenInterval);
                    this.setState({ buttonsDisabled: false, isSorting: false });
                  }
                }, GREEN_SPEED);
              }
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }

    heapSort() {
        this.setState({ buttonsDisabled: true, isSorting: true });
        const {array} = this.state;
        let check = array.sort((a, b) => a - b);
        let res = getHeapSortAnimationArray(array)
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
                        <button onClick={() => this.quickSort()} disabled={buttonsDisabled}>Quick Sort</button>
                        <button onClick={() => this.mergeSort()} disabled={buttonsDisabled}>Merge Sort</button>
                        <button onClick={() => this.heapSort()} disabled={buttonsDisabled}>Heap Sort</button>
                    </div>
                    <div className="buttonRight">
                        <button onClick={() => this.toggleSorting()} disabled={isSorting}>
                            {this.state.isSorting ? "Pause" : "Resume"}
                        </button>
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

/** Put functions outside component */

/** Generates random int from min to max */
function randomIntFrom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}