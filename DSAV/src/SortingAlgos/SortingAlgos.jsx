import React from "react";
import "./SortingAlgos.css"

{/* export default class defines the class we want to have as a tag*/}
export default class SortingAlgos extends React.Component {

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
        for (let i = 0; i < 100; i++) {
            array.push(randomIntFrom(5, 1000));
        }

        /** Sets the state to be the created array
         * If we didnt have setState, we wouldnt
         * update the array we created
         */
        this.setState({array})
    }

    /** Renders components UI */
    render() {
        /** Gets the state (array we created) */
        const {array} = this.state;
        return (
            <>
                {array.map((value, index) => (
                    <div className = "arrayBar" key = {index}>
                        {value}
                    </div>
                ))}
            </>
        );
    }
}

/** Put functions outside component */
function randomIntFrom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
