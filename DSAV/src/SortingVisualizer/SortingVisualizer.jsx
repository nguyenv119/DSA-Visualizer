


                                    /* 
                                    TODO:
                                    * ? : formatting
                                    ? Figure out speed with bubbleSort and the res
                                    ? Figure out how to set the states at the end, the timing since we have different ANIMATIONSPEEDS
                                    ? Progress bar corresponding to the completed animations? 
                                    ? Pop ups/down thing to show code while its running, explain runtime
                                    */




import React from "react";
import {mergeSortExp} from "../SortingAlgos/mergeSort"
import {bubbleSortExp, animate} from "../SortingAlgos/bubbleSort"
import {selectionSortExp} from "../SortingAlgos/selectionSort"
import {insertionSortExp} from "../SortingAlgos/insertionSort"
import {heapSortExp} from "../SortingAlgos/heapSort"
import {greenify} from "../SortingAlgos/CommonMethods/commonMethods";
import 'bootstrap/dist/css/bootstrap.css';

const MINVAL = 5;
const MAXVAL = 625;
const GOOD_COLOR = "#9706ff";
export const GREEN_SPEED = 1;
export const PRIMARY_COLOR = '#007ce8';
export const SECONDARY_COLOR = '#fe5f24';
export const SMALLER_COLOR = "#f44336";
export const LARGER_COLOR = "#50af50"
export const SAMESIZE_COLOR = "#f1cc32";
export const SMALLEST_SOFAR_COLOR = "#FC0FC0"
export const DONE_COLOR = "rgba(255, 0, 166, 0.87)";

/* export default class defines the class we want to have as a tag*/
export default class SortingVisualizer extends React.Component {

    /* 
    ? Called when react component is created 
     * props = properties, passed down from parent comp 
     * (component where this component is called):
    */
    constructor(props) {
        /* 
        ? Gets data */
        super(props);

        /* 
        ? Init the initial state of component */
        this.state = {
            array: [],
            sortingAlgorithm: null,
            isSorting: false,
            buttonsDisabled: false,
            ANIMATION_SPEED_MS: 6, 
            BARS: 10, 
            sortingInProgress: false, 
            activeButton: null,
            comparisons: 0,
        };
    };

    /* 
    ? Lifecycle method in React class component 
     * invoked immedientally after a component is 
     * mounted (inserted into DOM tree), rendered for the first time
     */
    // componentDidMount() { 
    //     this.makeArray()
    // }

  componentDidMount() {
    this.makeArray();

    // Add event listener for animation speed input
    const speedInput = document.getElementById("animationSpeedInput");
    speedInput.addEventListener("input", this.handleAnimationSpeedChange);
  }

  componentWillUnmount() {
    // Remove event listener when component is unmounted
    const speedInput = document.getElementById("animationSpeedInput");
    speedInput.removeEventListener("input", this.handleAnimationSpeedChange);
  }

    /* 
    ? Create properties before sorting: arrayBars, array, and speed*/
    makeProps() {
        this.setState({ buttonsDisabled: true, isSorting: true, sortingInProgress: true, timeElapsed: 0 });
        const arrayBars = document.getElementsByClassName("arrayBar");
        const { array } = this.state;
        
        return [array, arrayBars];
    }

    /*
    ? Determines the speed */
    getSpeed(ANIMATION_SPEED_MS) {
        const newSpeed = ANIMATION_SPEED_MS === 10?
        1 : ANIMATION_SPEED_MS === 8 ?
            4 : ANIMATION_SPEED_MS === 6 ?
                10 : ANIMATION_SPEED_MS === 4 ?
                    100 : ANIMATION_SPEED_MS === 2 ?
                        500 : ANIMATION_SPEED_MS === 0 ?
                            1000 : 3000;
        return newSpeed;
    }

    /* 
    ? Determines how many bars based on scrolling bar */
    determineBars() {
        const { BARS } = this.state;
        const length = BARS === 20 ? 
            300 : BARS === 19 ? 
                290 : BARS === 18 ? 
                    260 : BARS === 17 ? 
                        230 : BARS === 16 ? 
                            200 : BARS === 15 ? 
                                180 : BARS === 14 ? 
                                    160 : BARS === 13 ? 
                                        145 : BARS === 12 ? 
                                            120 : BARS === 11 ? 
                                                100 : BARS === 10 ? 
                                                    80 : BARS === 9 ? 
                                                        60 : BARS === 8 ? 
                                                            40 : BARS === 7 ? 
                                                                20 : BARS === 6 ? 
                                                                    10 : BARS === 5  
                                                                        ? 5 : 5;
        return length;
    }
 
    /* 
    ? Create the array, including how many bars and how wide */
    makeArray() {
        
        const array = [];
        let length = this.determineBars();

        for (let i = 0; i < length; i++) {
            array.push(randomIntFrom(MINVAL, MAXVAL));
        }

        /* 
        ? Sets the state to be the created array and the Bars.
         * If we didnt have setState, we wouldnt
         * update the array we created
         */
        this.setState({ comparisons: 0, array }, () => {
            /* 
            ? Resets the color of array back to PRIMARY, and determines width and length */            
            const arrayBars = document.getElementsByClassName("arrayBar");
            for (let i = 0; i < arrayBars.length; i++) {
                arrayBars[i].style.width = `${810 / length}px`;
                arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
            }
        });
    }

    updateTimeElapsed = (newTime) => {
        this.setState({ timeElapsed: newTime});
    }

    /* 
     * For all sorting algos, we are returned an animation array, and a copy
     * of the sorted array. At the end of every animation, we set the state
     * to be the sorted array, as to not redo the animations on the unsorted array
     * if it were not replaced with the sorted array */ 

    bubbleSort() {
        let [array, arrayBars] = this.makeProps();
        let [animations, arr] = bubbleSortExp(array, arrayBars);
      
        let completedAnimations = 0;
        let toBeSortedIndex = arr.length - 1;
        let comparisons = 0;
      
        const updateComparisons = this.updateComparisons; // Bind the method to a variable
      
        let idx = 0;
        let animationFrameId = null;
        let lastTimestamp = null;
      
        const animateStep = (timestamp) => {

          if (lastTimestamp === null) {
            lastTimestamp = timestamp;
          }
      
          const timeDifference = timestamp - lastTimestamp;
          const animationSpeed = this.getSpeed(this.state.ANIMATION_SPEED_MS);
      
          if (timeDifference >= animationSpeed) {
            lastTimestamp = timestamp;
      
            const stage = idx % 3;
      
            if (stage === 0) {
                const [barOneIdx, barTwoIdx] = animations[idx];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                barOneStyle.backgroundColor = SECONDARY_COLOR;
                barTwoStyle.backgroundColor = SECONDARY_COLOR;
                completedAnimations++;
                idx++;
            } 
            else if (stage === 1) {
                const [indexJ, indexJ1] = animations[idx - 1];
                const [indexJVal, indexJ1Val] = animations[idx];
    
                if (indexJVal === indexJ1Val) {
                    const barOneStyle = arrayBars[indexJ].style;
                    const barTwoStyle = arrayBars[indexJ1].style;
                    barOneStyle.backgroundColor = SAMESIZE_COLOR;
                    barTwoStyle.backgroundColor = SAMESIZE_COLOR;
                    updateComparisons(comparisons + 1);
                    comparisons++;
                    completedAnimations++;
                    idx++;
                } 
                else {
                    const smallerBarIndex = indexJVal < indexJ1Val ? indexJ : indexJ1;
                    const largerBarIndex = smallerBarIndex === indexJ ? indexJ1 : indexJ;
                    const barOneStyle = arrayBars[smallerBarIndex].style;
                    const barTwoStyle = arrayBars[largerBarIndex].style;
                    barOneStyle.backgroundColor = SMALLER_COLOR;
                    barTwoStyle.backgroundColor = LARGER_COLOR;
                    updateComparisons(comparisons + 1);
                    comparisons++;
                    completedAnimations++;
                    idx++;
                }
            } 
            else {
                const [indexJ, indexJ1] = animations[idx - 2];
                const [indexJVal, indexJ1Val] = animations[idx - 1];
        
                const smallerBarIndex = indexJVal < indexJ1Val ? indexJ : indexJ1;
                const largerBarIndex = smallerBarIndex === indexJ ? indexJ1 : indexJ;
                const barOneStyle = arrayBars[smallerBarIndex].style;
                const barTwoStyle = arrayBars[largerBarIndex].style;
                const largerHeight = indexJVal >= indexJ1Val ? indexJVal : indexJ1Val;
                const smallerHeight = indexJVal < indexJ1Val ? indexJVal : indexJ1Val;
        
                if (indexJVal > indexJ1Val) {
                        [barOneStyle.height, barTwoStyle.height] = [`${largerHeight}px`,`${smallerHeight}px`];
                        [barOneStyle.backgroundColor, barTwoStyle.backgroundColor] = [LARGER_COLOR, SMALLER_COLOR];
                } else {
                        [barOneStyle.backgroundColor, barTwoStyle.backgroundColor] = [GOOD_COLOR, GOOD_COLOR];
                }
                barOneStyle.backgroundColor = PRIMARY_COLOR;
                barTwoStyle.backgroundColor = PRIMARY_COLOR;
                if (indexJ1 === toBeSortedIndex) {
                    arrayBars[indexJ1].style.backgroundColor = DONE_COLOR;
                    toBeSortedIndex--;
                }
                greenify(completedAnimations, animations, arrayBars);
                completedAnimations++;
                idx++;
            }
            if (idx === animations.length - 1) {
                this.setState({
                    array: arr,
                    buttonsDisabled: false,
                    isSorting: false,
                    sortingInProgress: false,
                });
                return;
            }
          }
          animationFrameId = requestAnimationFrame(animateStep);
        };
      
        animateStep(performance.now());
        this.animationFrameId = animationFrameId;
    }
      
    /* 
    ? Updates the number of bars and their width */  
    handleBarsChange = (e) => {
        if (!this.state.isSorting) {
            this.setState({ BARS: parseInt(e.target.value) }, () => {
                this.makeArray();
            });
        }
    };

    /* 
    ? Changes the speed of animation */
    handleAnimationSpeedChange = (e) => {
        const newSpeed = parseInt(e.target.value);
        this.setState({ ANIMATION_SPEED_MS: newSpeed});
    };

    

    /* 
    ? Changes the state of the button that is being pressed down */
    buttonDown = (buttonName) => {
        this.setState({ activeButton: buttonName });
    };

    /* 
    ? Callback function to update comparisons. We have to pass in the function, 
    ? not just the varibale comparisons, because it will create a local copy of comparisons
    ? in the sorting JS file */
    updateComparisons = (newComparisons) => {
        this.setState({ comparisons: newComparisons });
    };

    selectionSort() {
        let [array, arrayBars, speed] = this.makeProps();
        let comparisons = 0;
        let [animations, arr] = selectionSortExp(array, arrayBars, ANIMATION_SPEED_MS, comparisons, this.updateComparisons);

        setTimeout(() => {
            this.setState({ array: arr, buttonsDisabled: false, isSorting: false, sortingInProgress: false});
        }, (animations.length) * ANIMATION_SPEED_MS);
    }

    insertionSort() {
        let [array, arrayBars, ANIMATION_SPEED_MS] = this.makeProps();
        let comparisons = 0;
        let [animations, arr] = insertionSortExp(array, arrayBars, ANIMATION_SPEED_MS, comparisons, this.updateComparisons);

        setTimeout(() => {
            this.setState({ array: arr, buttonsDisabled: false, isSorting: false, sortingInProgress: false});
        }, (animations.length) * ANIMATION_SPEED_MS);
    }
    
    mergeSort() {
        let [array, arrayBars, ANIMATION_SPEED_MS] = this.makeProps();
        let comparisons = 0;
        let [animations, arr] = mergeSortExp(array, arrayBars, ANIMATION_SPEED_MS, comparisons, this.updateComparisons);

        setTimeout(() => {
            this.setState({ array: arr, buttonsDisabled: false, isSorting: false, sortingInProgress: false});
        }, (animations.length * 1.15) * ANIMATION_SPEED_MS);
    }

    heapSort() {
        let [array, arrayBars, ANIMATION_SPEED_MS] = this.makeProps();
        let comparisons = 0;
        let [maxHeapAnimations, heapSortAnimations, arr] = heapSortExp(array, arrayBars, ANIMATION_SPEED_MS, comparisons, this.updateComparisons);

        setTimeout(() => {
            this.setState({ array: arr, buttonsDisabled: false, isSorting: false, sortingInProgress: false});
        }, (maxHeapAnimations.length + heapSortAnimations.length) * ANIMATION_SPEED_MS);
    }

    /* 
    ? Renders components UI */
    render() {
        /* 
        ? Gets the state (array we created) out of the object, 
         * We need the {}, won't work with just array
        */
        const { array, activeButton, isSorting, ANIMATION_SPEED_MS, BARS, comparisons } = this.state;
        return (
            /* 
            ? Map = go through each num in array, extracting value and index and making it into a bar:
             * 
             * Can put any variable name because when we call array.map, 
             * 2 parameters are returned: value and index, so the callback function
             * knows to associate.
             * 
             * ref: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_map3
            */

            <div className="arrayContainer">
                <div>
                    <div className="buttonContainer">
                        <div className="buttonGroup">
                            <div className="btn-container">
                                <button className = {`btn-3d regular${activeButton === "generateArray" ? ' down' : ''}`} 
                                onClick={() => {
                                    this.makeArray();
                                    this.buttonDown("generateArray");
                                }} 
                                disabled={isSorting}>Generate New Array</button>
                            </div>
                            <div className="btn-container">
                                <button className = {`btn-3d regular${activeButton === "bubbleSort" ? ' down' : ''}`} 
                                onClick={() => {
                                    this.bubbleSort()
                                    this.buttonDown("bubbleSort");
                                }} 
                                disabled={this.state.sortingInProgress}>Bubble Sort</button>
                            </div>
                            <div className="btn-container">
                                <button className = {`btn-3d regular${activeButton === "selectionSort" ? ' down' : ''}`} 
                                onClick={() => {
                                    this.selectionSort()
                                    this.buttonDown("selectionSort");
                                }}
                                disabled={this.state.sortingInProgress}>Selection Sort</button>
                            </div>
                            <div className="btn-container">
                                <button className = {`btn-3d regular${activeButton === "insertionSort" ? ' down' : ''}`} 
                                onClick={() => {
                                    this.insertionSort()
                                    this.buttonDown("insertionSort");
                                }} 
                                disabled={this.state.sortingInProgress}>Insertion Sort</button>
                            </div>
                            <div className="btn-container">
                                <button className = {`btn-3d regular${activeButton === "mergeSort" ? ' down' : ''}`} 
                                onClick={() => {
                                    this.mergeSort()
                                    this.buttonDown("mergeSort");
                                }
                                } disabled={this.state.sortingInProgress}>Merge Sort</button>
                            </div>
                            <div className="btn-container">
                                <button className = {`btn-3d regular${activeButton === "heapSort" ? ' down' : ''}`} 
                                onClick={() => {
                                    this.heapSort()
                                    this.buttonDown("heapSort");
                                }} 
                                disabled={this.state.sortingInProgress}>Heap Sort</button>
                            </div>
                        </div>
                    </div>
                    <div className="settings">
                        <div className="scrollableRangeContainer">
                            <label for="animationSpeedInput" className="form-label"></label>
                            <div className="scrollableRange">
                                <input
                                    type="range"
                                    className="form-range"
                                    min="0"
                                    max="10"
                                    step="2"
                                    id="animationSpeedInput"
                                    value={ANIMATION_SPEED_MS}
                                    onChange={this.handleAnimationSpeedChange}
                                ></input>
                            </div>
                        </div>
                        <button className="btn-3d regular colorful speed">
                            Speed
                        </button>
                        <div className="scrollableRangeContainer">
                            <label for="customRange4" className="form-label"></label>
                            <div className="scrollableRange">
                                <input
                                    type="range"
                                    className="form-range"
                                    min="5"
                                    max="20"
                                    step="1"
                                    id="customRange4"
                                    value={BARS}
                                    onChange={this.handleBarsChange}
                                ></input>
                            </div>
                        </div>
                        <button className="btn-3d colorful regular length">
                            Array Length
                        </button>
                        <button className="btn-3d regular comparisons"> 
                        Comparisions: {comparisons}                                
                        </button>
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

/*
! Put functions outside 
*/

/* 
? Generates random int from min to max 
*/
function randomIntFrom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

    // bubbleSort() {
    //     let [array, arrayBars, timeElapsed] = this.makeProps();
    //     let [animations, arr] = bubbleSortExp(array, arrayBars)
        
    //     /** Animates bubbleSort */
    //     let completedAnimations = 0;
    //     let toBeSortedIndex = arr.length - 1;
    //     let comparisons = 0;
        
    //     for (let idx = 0; idx < animations.length; idx++) {
    //         setTimeout(() => {
    //             console.log(timeElapsed);

    //             const stage = idx % 3;

    //             if (stage === 0) {
    //                 const [barOneIdx, barTwoIdx] = animations[idx];
    //                 const barOneStyle = arrayBars[barOneIdx].style;
    //                 const barTwoStyle = arrayBars[barTwoIdx].style;    
    //                 setTimeout(() => {
    //                     barOneStyle.backgroundColor = SECONDARY_COLOR;
    //                     barTwoStyle.backgroundColor = SECONDARY_COLOR;
    //                     completedAnimations++;
    //                     // console.log(this.getSpeed(this.state.ANIMATION_SPEED_MS))
    //                 }, timeElapsed + this.getSpeed(this.state.ANIMATION_SPEED_MS));
    //             }
    //             else if (stage === 1) {
    //                 const [indexJ, indexJ1] = animations[idx - 1];
    //                 const [indexJVal, indexJ1Val] = animations[idx];
            
    //                 /** If two bars have the same height */
    //                 if (indexJVal === indexJ1Val) {
    //                     const barOneStyle = arrayBars[indexJ].style;
    //                     const barTwoStyle = arrayBars[indexJ1].style; 
    //                     setTimeout(() => {
    //                         barOneStyle.backgroundColor = SAMESIZE_COLOR;
    //                         barTwoStyle.backgroundColor = SAMESIZE_COLOR;
    //                         this.updateComparisons(comparisons + 1)
    //                         comparisons++;
    //                         // console.log(this.getSpeed(this.state.ANIMATION_SPEED_MS))
    //                     }, timeElapsed + this.getSpeed(this.state.ANIMATION_SPEED_MS));
    //                 }
    //                 else {
    //                     /** Determines which bars should be green (larger) and red (smaller) */
    //                     const smallerBarIndex = (indexJVal < indexJ1Val) ? indexJ : indexJ1;
    //                     const largerBarIndex = (smallerBarIndex === indexJ) ? indexJ1 : indexJ;
    //                     const barOneStyle = arrayBars[smallerBarIndex].style;
    //                     const barTwoStyle = arrayBars[largerBarIndex].style; 
            
    //                     setTimeout(() => {
    //                         barOneStyle.backgroundColor = SMALLER_COLOR;
    //                         barTwoStyle.backgroundColor = LARGER_COLOR;
    //                         this.updateComparisons(comparisons + 1)
    //                         comparisons++;
    //                         // console.log(this.getSpeed(this.state.ANIMATION_SPEED_MS))
    //                     }, timeElapsed + this.getSpeed(this.state.ANIMATION_SPEED_MS));
    //                 }
    //                 completedAnimations++;
    //             }
    //             else {
    //                 const [indexJ, indexJ1] = animations[idx - 2];
    //                 const [indexJVal, indexJ1Val] = animations[idx - 1];
                    
    //                 const smallerBarIndex = (indexJVal < indexJ1Val) ? indexJ : indexJ1;
    //                 const largerBarIndex = (smallerBarIndex === indexJ) ? indexJ1 : indexJ;
    //                 const barOneStyle = arrayBars[smallerBarIndex].style;
    //                 const barTwoStyle = arrayBars[largerBarIndex].style; 
    //                 const largerHeight = (indexJVal >= indexJ1Val) ? indexJVal : indexJ1Val;
    //                 const smallerHeight = (indexJVal < indexJ1Val) ? indexJVal : indexJ1Val;
            
    //                 if (indexJVal > indexJ1Val) {
    //                     /** only switch height if the smaller index > larger index */
    //                     setTimeout(() => {
    //                         [barOneStyle.height, barTwoStyle.height] = [`${largerHeight}px`, `${smallerHeight}px`];
    //                         [barOneStyle.backgroundColor, barTwoStyle.backgroundColor] = [LARGER_COLOR, SMALLER_COLOR];
    //                         // console.log(this.getSpeed(this.state.ANIMATION_SPEED_MS))
    //                     }, timeElapsed + this.getSpeed(this.state.ANIMATION_SPEED_MS));
    //                 }
    //                 /** if not, set both bars to purple */
    //                 else {
    //                     setTimeout(() => {
    //                         [barOneStyle.backgroundColor, barTwoStyle.backgroundColor] = [GOOD_COLOR, GOOD_COLOR];
    //                         // console.log(this.getSpeed(this.state.ANIMATION_SPEED_MS))
    //                     }, timeElapsed + this.getSpeed(this.state.ANIMATION_SPEED_MS));
    //                 }
    //                 completedAnimations++;
    //                 setTimeout(() => {
    //                     barOneStyle.backgroundColor = PRIMARY_COLOR;
    //                     barTwoStyle.backgroundColor = PRIMARY_COLOR;
    //                     if (indexJ1 === toBeSortedIndex) {
    //                             arrayBars[indexJ1].style.backgroundColor = DONE_COLOR;
    //                             toBeSortedIndex--;
    //                     } 
    //                     // console.log(this.getSpeed(this.state.ANIMATION_SPEED_MS))
    //                     greenify(completedAnimations, animations, arrayBars);
    //                 }, (timeElapsed) + 2 * this.getSpeed(this.state.ANIMATION_SPEED_MS));
    //             }
    //             if (idx === animations.length) {
    //                 setTimeout(() => {
    //                     this.setState({ array: arr, buttonsDisabled: false, isSorting: false, sortingInProgress: false});
    //                 }, (animations.length) * this.getSpeed(this.state.ANIMATION_SPEED_MS));
    //             }
    //         }, timeElapsed + this.getSpeed(this.state.ANIMATION_SPEED_MS));
    //         this.updateTimeElapsed(timeElapsed + this.state.ANIMATION_SPEED_MS);
    //     }
    // }

    // bubbleSort() {
    //     let [array, arrayBars, timeElapsed] = this.makeProps();
    //     let [animations, arr] = bubbleSortExp(array, arrayBars);
      
    //     /** Animates bubbleSort */
    //     let completedAnimations = 0;
    //     let toBeSortedIndex = arr.length - 1;
    //     let comparisons = 0;
      
    //     const getSpeed = this.getSpeed; // Bind the method to a variable
    //     const updateComparisons = this.updateComparisons; // Bind the method to a variable
    //     let animationSpeed = getSpeed(this.state.ANIMATION_SPEED_MS);
      
    //     for (let idx = 0; idx < animations.length; idx++) {

    //         ((timeElapsed, animationSpeed) => {
    //             setTimeout(() => {
    //                 // console.log(timeElapsed);
    //                 let newSpeed = getSpeed(this.state.ANIMATION_SPEED_MS);
    //                 console.log([timeElapsed, newSpeed]);
              
    //                 const stage = idx % 3;
              
    //                 if (stage === 0) {
    //                   const [barOneIdx, barTwoIdx] = animations[idx];
    //                   const barOneStyle = arrayBars[barOneIdx].style;
    //                   const barTwoStyle = arrayBars[barTwoIdx].style;
    //                   setTimeout(() => {
    //                     barOneStyle.backgroundColor = SECONDARY_COLOR;
    //                     barTwoStyle.backgroundColor = SECONDARY_COLOR;
    //                     completedAnimations++;
    //                     // console.log(newSpeed)
    //                   }, timeElapsed + newSpeed);
    //                 } else if (stage === 1) {
    //                   const [indexJ, indexJ1] = animations[idx - 1];
    //                   const [indexJVal, indexJ1Val] = animations[idx];
              
    //                   /** If two bars have the same height */
    //                   if (indexJVal === indexJ1Val) {
    //                     const barOneStyle = arrayBars[indexJ].style;
    //                     const barTwoStyle = arrayBars[indexJ1].style;
    //                     setTimeout(() => {
    //                       barOneStyle.backgroundColor = SAMESIZE_COLOR;
    //                       barTwoStyle.backgroundColor = SAMESIZE_COLOR;
    //                       updateComparisons(comparisons + 1);
    //                       comparisons++;
    //                       // console.log(animationSpeed)
    //                     }, timeElapsed + newSpeed);
    //                   } else {
    //                     /** Determines which bars should be green (larger) and red (smaller) */
    //                     const smallerBarIndex = indexJVal < indexJ1Val ? indexJ : indexJ1;
    //                     const largerBarIndex = smallerBarIndex === indexJ ? indexJ1 : indexJ;
    //                     const barOneStyle = arrayBars[smallerBarIndex].style;
    //                     const barTwoStyle = arrayBars[largerBarIndex].style;
              
    //                     setTimeout(() => {
    //                       barOneStyle.backgroundColor = SMALLER_COLOR;
    //                       barTwoStyle.backgroundColor = LARGER_COLOR;
    //                       updateComparisons(comparisons + 1);
    //                       comparisons++;
    //                       // console.log(animationSpeed)
    //                     }, timeElapsed + animationSpeed);
    //                   }
    //                   completedAnimations++;
    //                 } else {
    //                   const [indexJ, indexJ1] = animations[idx - 2];
    //                   const [indexJVal, indexJ1Val] = animations[idx - 1];
              
    //                   const smallerBarIndex = indexJVal < indexJ1Val ? indexJ : indexJ1;
    //                   const largerBarIndex = smallerBarIndex === indexJ ? indexJ1 : indexJ;
    //                   const barOneStyle = arrayBars[smallerBarIndex].style;
    //                   const barTwoStyle = arrayBars[largerBarIndex].style;
    //                   const largerHeight = indexJVal >= indexJ1Val ? indexJVal : indexJ1Val;
    //                   const smallerHeight = indexJVal < indexJ1Val ? indexJVal : indexJ1Val;
              
    //                   if (indexJVal > indexJ1Val) {
    //                     /** only switch height if the smaller index > larger index */
    //                     setTimeout(() => {
    //                       [barOneStyle.height, barTwoStyle.height] = [
    //                         `${largerHeight}px`,
    //                         `${smallerHeight}px`,
    //                       ];
    //                       [barOneStyle.backgroundColor, barTwoStyle.backgroundColor] = [
    //                         LARGER_COLOR,
    //                         SMALLER_COLOR,
    //                       ];
    //                     }, timeElapsed + newSpeed);
    //                   }
    //                   /** if not, set both bars to purple */
    //                   else {
    //                     setTimeout(() => {
    //                       [barOneStyle.backgroundColor, barTwoStyle.backgroundColor] = [
    //                         GOOD_COLOR,
    //                         GOOD_COLOR,
    //                       ];
    //                     }, timeElapsed + newSpeed);
    //                   }
    //                   completedAnimations++;
    //                   setTimeout(() => {
    //                     barOneStyle.backgroundColor = PRIMARY_COLOR;
    //                     barTwoStyle.backgroundColor = PRIMARY_COLOR;
    //                     if (indexJ1 === toBeSortedIndex) {
    //                       arrayBars[indexJ1].style.backgroundColor = DONE_COLOR;
    //                       toBeSortedIndex--;
    //                     }
    //                     greenify(completedAnimations, animations, arrayBars);
    //                   }, timeElapsed + 2 * newSpeed);
    //                   if (idx === animations.length - 1) {
    //                       setTimeout(() => {
    //                         this.setState({
    //                           array: arr,
    //                           buttonsDisabled: false,
    //                           isSorting: false,
    //                           sortingInProgress: false,
    //                         });
    //                       }, timeElapsed + 3 * newSpeed);
    //                   }
    //                 }
    //                 timeElapsed += newSpeed;
    //             }, timeElapsed);
    //         }) (timeElapsed, animationSpeed);

    //         animationSpeed = getSpeed(this.state.ANIMATION_SPEED_MS);
    //         // timeElapsed += getSpeed(this.state.ANIMATION_SPEED_MS);
    //     }
    //   }
      
    // bubbleSort() {
    //     let [array, arrayBars, timeElapsed] = this.makeProps();
    //     let [animations, arr] = bubbleSortExp(array, arrayBars);
      
    //     /** Animates bubbleSort */
    //     let completedAnimations = 0;
    //     let toBeSortedIndex = arr.length - 1;
    //     let comparisons = 0;
      
    //     // const getSpeed = this.getSpeed; // Bind the method to a variable
    //     const updateComparisons = this.updateComparisons; // Bind the method to a variable
    //     // let animationSpeed = getSpeed(this.state.ANIMATION_SPEED_MS);
      
    //     let idx = 0;
      
    //     const animateStep = () => {
    //       if (idx >= animations.length) {
    //         this.setState({
    //           array: arr,
    //           buttonsDisabled: false,
    //           isSorting: false,
    //           sortingInProgress: false,
    //           timeElapsed: 0,
    //         });
    //         return;
    //       }
      
    //     //   let newSpeed = this.getSpeed(this.state.ANIMATION_SPEED_MS);
    //       console.log([this.state.timeElapsed, this.getSpeed(this.state.ANIMATION_SPEED_MS)]);
      
    //       const stage = idx % 3;
      
    //       if (stage === 0) {
    //         const [barOneIdx, barTwoIdx] = animations[idx];
    //         const barOneStyle = arrayBars[barOneIdx].style;
    //         const barTwoStyle = arrayBars[barTwoIdx].style;
    //         setTimeout(() => {
    //           barOneStyle.backgroundColor = SECONDARY_COLOR;
    //           barTwoStyle.backgroundColor = SECONDARY_COLOR;
    //           completedAnimations++;
    //           animateStep();
    //         }, this.state.timeElapsed + this.getSpeed(this.state.ANIMATION_SPEED_MS));
    //       } else if (stage === 1) {
    //         const [indexJ, indexJ1] = animations[idx - 1];
    //         const [indexJVal, indexJ1Val] = animations[idx];
      
    //         if (indexJVal === indexJ1Val) {
    //           const barOneStyle = arrayBars[indexJ].style;
    //           const barTwoStyle = arrayBars[indexJ1].style;
    //           setTimeout(() => {
    //             barOneStyle.backgroundColor = SAMESIZE_COLOR;
    //             barTwoStyle.backgroundColor = SAMESIZE_COLOR;
    //             updateComparisons(comparisons + 1);
    //             comparisons++;
    //             animateStep();
    //           }, this.state.timeElapsed + this.getSpeed(this.state.ANIMATION_SPEED_MS));
    //         } else {
    //           const smallerBarIndex = indexJVal < indexJ1Val ? indexJ : indexJ1;
    //           const largerBarIndex = smallerBarIndex === indexJ ? indexJ1 : indexJ;
    //           const barOneStyle = arrayBars[smallerBarIndex].style;
    //           const barTwoStyle = arrayBars[largerBarIndex].style;
      
    //           setTimeout(() => {
    //             barOneStyle.backgroundColor = SMALLER_COLOR;
    //             barTwoStyle.backgroundColor = LARGER_COLOR;
    //             updateComparisons(comparisons + 1);
    //             comparisons++;
    //             animateStep();
    //           }, this.state.timeElapsed + this.getSpeed(this.state.ANIMATION_SPEED_MS));
    //         }
    //         completedAnimations++;
    //       } else {
    //         const [indexJ, indexJ1] = animations[idx - 2];
    //         const [indexJVal, indexJ1Val] = animations[idx - 1];
      
    //         const smallerBarIndex = indexJVal < indexJ1Val ? indexJ : indexJ1;
    //         const largerBarIndex = smallerBarIndex === indexJ ? indexJ1 : indexJ;
    //         const barOneStyle = arrayBars[smallerBarIndex].style;
    //         const barTwoStyle = arrayBars[largerBarIndex].style;
    //         const largerHeight = indexJVal >= indexJ1Val ? indexJVal : indexJ1Val;
    //         const smallerHeight = indexJVal < indexJ1Val ? indexJVal : indexJ1Val;
      
    //         if (indexJVal > indexJ1Val) {
    //           setTimeout(() => {
    //             [barOneStyle.height, barTwoStyle.height] = [
    //               `${largerHeight}px`,
    //               `${smallerHeight}px`,
    //             ];
    //             [barOneStyle.backgroundColor, barTwoStyle.backgroundColor] = [
    //               LARGER_COLOR,
    //               SMALLER_COLOR,
    //             ];
    //             animateStep();
    //           }, this.state.timeElapsed + this.getSpeed(this.state.ANIMATION_SPEED_MS));
    //         } else {
    //           setTimeout(() => {
    //             [barOneStyle.backgroundColor, barTwoStyle.backgroundColor] = [
    //               GOOD_COLOR,
    //               GOOD_COLOR,
    //             ];
    //             animateStep();
    //           }, this.state.timeElapsed + this.getSpeed(this.state.ANIMATION_SPEED_MS));
    //         }
    //         completedAnimations++;
    //         setTimeout(() => {
    //           barOneStyle.backgroundColor = PRIMARY_COLOR;
    //           barTwoStyle.backgroundColor = PRIMARY_COLOR;
    //           if (indexJ1 === toBeSortedIndex) {
    //             arrayBars[indexJ1].style.backgroundColor = DONE_COLOR;
    //             toBeSortedIndex--;
    //           }
    //           greenify(completedAnimations, animations, arrayBars);
    //           animateStep();
    //         }, this.state.timeElapsed + 2 * this.getSpeed(this.state.ANIMATION_SPEED_MS));
    //       }
    //       this.setState({ timeElapsed: timeElapsed += this.getSpeed(this.state.ANIMATION_SPEED_MS)})
    //     //   timeElapsed += this.getSpeed(this.state.ANIMATION_SPEED_MS);
    //       idx++;

    //     };
    //     animateStep();
    //   }