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
const GREEN_SPEED = 1;
const PRIMARY_COLOR = 'rgb(88, 118, 255)';
const SECONDARY_COLOR = 'orange';
const LARGER_COLOR = "red";
const SMALLER_COLOR = "limegreen"
const SAMESIZE_COLOR = "yellow";
const BARS = 150;

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

    selectionSort() {
        this.setState({ buttonsDisabled: true, isSorting: true });
        const {array} = this.state;
        // let check = array.sort((a, b) => a - b);
        let res = getSelectionSortAnimationArray(array.slice())
        this.setState({res})
        // console.log(check.every((value, index) => value === res[index]))
    }

    insertionSort() {
        this.setState({ buttonsDisabled: true, isSorting: true });
        const {array} = this.state;
        // let check = array.sort((a, b) => a - b);
        let res = getInsertionSortAnimationArray(array.slice())
        this.setState({res})
        // console.log(check.every((value, index) => value === res[index]))
    }

    quickSort() {
        this.setState({ buttonsDisabled: true, isSorting: true });
        const {array} = this.state;
        // let check = array.sort((a, b) => a - b);
        let res = getQuickSortAnimationArray(array.slice())
        this.setState({res})
        // console.log(check.every((value, index) => value === res[index]))
    }

    bubbleSort() {
        this.setState({ buttonsDisabled: true, isSorting: true });
        const { array } = this.state;
        const arrayBars = document.getElementsByClassName("arrayBar");
        let res = getBubbleSortAnimationArray(array.slice());
        console.log(res);

        this.resetColors()
        this.animate(res, arrayBars, 0)
    }

    mergeSort() {
        this.setState({ buttonsDisabled: true, isSorting: true });
        const { array } = this.state;
        const arrayBars = document.getElementsByClassName("arrayBar");

        const res = getMergeSortAnimationArray(array.slice());

        this.resetColors();        
        this.animate(res, arrayBars, 0);
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
    
    /** Resets the color of the array before sorting back to PRIMARY */
    resetColors() {
        const arrayBars = document.getElementsByClassName("arrayBar");
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
          }
    }

    /** Animates the array sorting 
     * 0: initial compare
     * 1: indexSmall, indexLarge
     * 2: indexSmallValue, indexLargeValue
     * 3: replace index with heights
    */
    animate(res, arrayBars, completedAnimations) {

        for (let i = 0; i < res.length; i++) {
            const stage = i % 4;
            console.log(`${stage } ${res[i]}`);
            
            if (stage === 0) {
              const [barOneIdx, barTwoIdx] = res[i];
            //   console.log(`${i} ${stage} ` + res[i]);
              const barOneStyle = arrayBars[barOneIdx].style;
              const barTwoStyle = arrayBars[barTwoIdx].style;

              /** Either 1 (switch back) or 0 (initial compare) 
               * If its switch back: primary
               * if its initial compare: primary
              */
            //   const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        
              setTimeout(() => {
                barOneStyle.backgroundColor = SECONDARY_COLOR;
                barTwoStyle.backgroundColor = SECONDARY_COLOR;
                completedAnimations += 2;
                // this.checkGreen(completedAnimations, res, arrayBars);
              }, (i + 1) * ANIMATION_SPEED_MS);

              setTimeout(() => {
                barOneStyle.backgroundColor = PRIMARY_COLOR;
                barTwoStyle.backgroundColor = PRIMARY_COLOR;
                this.checkGreen(completedAnimations, res, arrayBars);
            }, (i + 2) * ANIMATION_SPEED_MS);
            } 
            else if (stage === 2) {
                /** We know index 2: switching places:
                 * determine larger and smaller number = green/red
                 */
                const [indexSmall, indexLarge] = res[i - 1];
                if (indexSmall !== indexLarge) {
                    const [smallBar, largeBar] = res[i];
                    const smallBarStyle = arrayBars[indexSmall].style;
                    const largeBarStyle = arrayBars[indexLarge].style;
                    setTimeout(() => {
                        if (smallBar === largeBar) {
                            smallBarStyle.backgroundColor = SAMESIZE_COLOR;
                            largeBarStyle.backgroundColor = SAMESIZE_COLOR;
                        }
                        else {
                            smallBarStyle.backgroundColor = SMALLER_COLOR;
                            largeBarStyle.backgroundColor = LARGER_COLOR;
                        }
                        completedAnimations += 2;
                    }, (i + 1) * ANIMATION_SPEED_MS);
                    setTimeout(() => {
                        smallBarStyle.backgroundColor = PRIMARY_COLOR;
                        largeBarStyle.backgroundColor = PRIMARY_COLOR;
                    }, (i + 2) * ANIMATION_SPEED_MS);
                }
            } 
            else if (stage === 3) {
              setTimeout(() => {

                /** We know index 2: switching places:
                 * determine larger and smaller number = green/red
                 */
                const [barOneIdx, newHeight] = res[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                barOneStyle.backgroundColor = "purple";
                completedAnimations++;
                // this.checkGreen(completedAnimations, res, arrayBars);
              }, i * ANIMATION_SPEED_MS);
              setTimeout(() => {
                barOneStyle.backgroundColor = PRIMARY_COLOR;
                this.checkGreen(completedAnimations, res, arrayBars);
            }, (i + 1) * ANIMATION_SPEED_MS);
            }
          }
    }

      
      

    /** Checks and changes the arrayBars to green if sorted. 
     * All animations completed, now gradually turn bars green 
     * By incrementing the greenIndex each time we make a bar green, 
     * we can see when we reach the end
    */
    checkGreen(completedAnimations, res, arrayBars) {
        if (completedAnimations === res.length) {
            let greenIndex = 0;
            const greenInterval = setInterval(() => {
              arrayBars[greenIndex].style.backgroundColor = LARGER_COLOR;
              greenIndex++;
  
              if (greenIndex === arrayBars.length) {
                clearInterval(greenInterval);
                this.setState({ buttonsDisabled: false, isSorting: false });
              }
            }, GREEN_SPEED);
        }
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