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
