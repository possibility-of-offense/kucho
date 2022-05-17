import { useContext } from "react";
import { TodayFoodContext } from "../App";

export default function TodayFood() {
  const context = useContext(TodayFoodContext);

  return (
    <div className="flexify">
      <h2>Today food - </h2>
      {context?.portions ? (
        <p>
          {context.portions.amount}gr. {context.portions.day}
        </p>
      ) : (
        <p>No food yet! Kucho is hungry!</p>
      )}
    </div>
  );
}
