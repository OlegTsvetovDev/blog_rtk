import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseCount,
  //  selectCount
} from "../features/posts/postsSlice";

const Counter = () => {
  const dispatch = useDispatch();
  // const counterValue = useSelector(selectCount)

  const handleClick = () => {
    dispatch(increaseCount());
  };

  return <button onClick={handleClick}>{/* {counterValue} */}</button>;
};

export default Counter;
