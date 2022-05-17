import { useContext } from "react";
import { DataContext } from "../App";
import "../styles/grid-table.css";
import GridTableBodyItem from "./GridTableBodyItem";

export default function GridTable() {
  const context = useContext(DataContext);

  if (context?.portions.length) {
    return (
      <div className="grid-table box-shadow-1">
        <div className="grid-table__header">
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
          <div>Sunday</div>
        </div>
        <div className="grid-table__body">
          {context?.portions.length > 0 &&
            context.portions.map((el) => {
              return <GridTableBodyItem key={el.day} data={el} />;
            })}
        </div>
      </div>
    );
  } else {
    return <h2>No portions yet</h2>;
  }
}
