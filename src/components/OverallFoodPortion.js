import { useContext } from "react";
import { DataContext } from "../App";

export default function OverallFoodPortion() {
  const overall = useContext(DataContext);

  function convertToKg(gr) {
    const kgs = gr / 1000;
    return `${kgs} kg`;
  }

  return (
    <div className="flexify">
      <h2>Overall - </h2>
      {overall.overall > 0 ? (
        <p>
          {overall.overall}gr. or {convertToKg(+overall.overall)}
        </p>
      ) : (
        <p>No overall stats yet!</p>
      )}
    </div>
  );
}
