# Redux-Counter
Modern Redux with Redux Toolkit

## Introduction:
As a part of redux exercise in my bootcamp in 2019, we created the following counter [project](https://github.com/sunilale0/redux-counter) using the, now, legacy redux. I wanted to see how different/easier Redux Toolkit is from the legacy redux by modifying the project using `@reduxjs/toolkit`. 

The difference is quite huge, in the sense that redux toolkit is a lot more easier to understand, write and debug.
The application with the redux dev tool visualization looks like this:
[img](counter-using-modern-redux-toolkit.gif)

## Main Codes:

The code base shortened by quite a lot. I'd say, the number of lines of code in total was halved after implementing the modern redux toolkit.

```javascript
// /redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import resultsReducer from "./resultsSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    results: resultsReducer,
  },
});

// ----------------------------------------------------------------


// index.js

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// ------------------------------------------------------------------


// App.js
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './containers/Counter/Counter'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter/>
      </header>
    </div>
  );
}

export default App;
// ----------------------------------------------------------------

// redux/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    add: (state, action) => {
      state.count += action.payload;
    },
    subtract: (state, action) => {
      state.count -= action.payload;
    },
  },
});

export const { increment, decrement, add, subtract } = counterSlice.actions;

export default counterSlice.reducer;
// -----------------------------------------------------------------


// redux/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const resultsSlice = createSlice({
  name: "result",
  initialState: {
    results: [],
  },
  reducers: {
    updateResult: (state, action) => {
      const d = new Date();
      state.results.push({ id: d.valueOf(), value: action.payload });
    },
    deleteResult: (state, action) => {
      state.results = state.results.filter(
        (result) => result.id !== action.payload
      );
    },
  },
});

export const { updateResult, deleteResult } = resultsSlice.actions;

export default resultsSlice.reducer;
// ----------------------------------------------------------------


// /containers/Counter/Counter.js

import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, add, subtract } from "../../redux/counterSlice";
import { updateResult, deleteResult } from "../../redux/resultsSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const results = useSelector((state) => {
    console.log("inside results: ", state);
    return state.results.results;
  });
  console.log("results now is: ", results);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div>{count}</div>
      <div>
        <button
          onClick={() => dispatch(increment())}
          className="btn btn-primary"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="btn btn-danger"
        >
          Decrement
        </button>
        <button onClick={() => dispatch(add(10))} className="btn btn-primary">
          Add 10
        </button>
        <button
          onClick={() => dispatch(subtract(8))}
          className="btn btn-danger"
        >
          Subtract 8
        </button>
        <hr />
        <button
          onClick={() => dispatch(updateResult(count))}
          className="btn btn-success btn-block"
        >
          {" "}
          Store Result
        </button>
        <ul>
          {results.map((strResult) => (
            <li
              key={strResult.id}
              onClick={() => dispatch(deleteResult(strResult.id))}
            >
              {strResult.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Counter;
//----------------------------------------------------------------

```

### `useSelector` and `useDispatch` hooks are used
imported as:
```javascript
import { useSelector, useDispatch } from "react-redux";
```
`useSelector` - to access the state
`useDispatch` - to dispatch or the actions


## Conclusion
In short, all of the components of redux: `state`, `action` and `reducer`, can be defined in one function with minimal amount of coding.
After these components are passed into the main component (in my case, `index.js`), all of the actions can be accessed in child components without having to go through the tedious process of creating `mapStateToProps`, and using `connect` to connect the child apps to the `redux state`. 
