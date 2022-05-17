import React, { useState, useRef, useCallback, useContext } from "react";
import { DataContext } from "../App";
import Alert from "./Alert";

export default function AddFavoriteFood() {
  const context = useContext(DataContext);
  const [showing, setShowing] = useState(false);
  const [val, setVal] = useState("");
  const divRef = useRef(null);

  function handleInput(v) {
    if (divRef.current) {
      if (v === "focus") {
        divRef.current.classList.add("active");
      }
      if (v === "blur") {
        if (!val) {
          divRef.current.classList.remove("active");
        }
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    context.setFavoriteFood(val);
    setVal("");
    divRef.current.querySelector("input").focus();
    setShowing(true);
  }

  return (
    <>
      {showing && <Alert success={true}>You have added a favorite food!</Alert>}
      <form className="add-favorite" onSubmit={handleSubmit}>
        <h4>Add favorite food</h4>
        <div ref={divRef}>
          <label>Favorite Food</label>
          <input
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onFocus={handleInput.bind(null, "focus")}
            onBlur={handleInput.bind(null, "blur")}
          />
        </div>
        <br />
        <button className="btn-3">Add Favorite</button>
      </form>
    </>
  );
}
