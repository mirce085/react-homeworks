import './App.css';
import React, {useReducer} from "react";
import {Step} from "./components/Step";
import {Count} from "./components/Count";

export const Context = React.createContext();

function reducer(state, action) {
  switch (action.type) {
      case "stepIncrement":
        return {
          stepValue : ++state.stepValue,
          value: state.value
        };
      case "stepDecrement":
        return {
          stepValue : --state.stepValue,
          value: state.value
        };
      case "changeValue":
        return {
          stepValue : state.stepValue,
          value: state.value += state.stepValue
        };
      default:
        return state;
  }
}

function App() {
  const [{stepValue, value}, dispatch] = useReducer(reducer, {value : 0, stepValue:1});


  return (
    <>
      <Context.Provider value={{stepValue, value, dispatch}}>
        <Step/>
        <button onClick={() => dispatch({type: "changeValue"})}>Click me</button>
        <Count/>
      </Context.Provider>
    </>
  );
}

export default App;
