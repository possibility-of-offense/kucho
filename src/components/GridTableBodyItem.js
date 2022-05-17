import { useState, useEffect } from "react";

export default function GridTableBodyItem(props) {
  const [column, setColumn] = useState(0);

  useEffect(() => {
    switch (props.data.day) {
      case "Monday":
        setColumn("1/2");
        break;
      case "Tuesday":
        setColumn("2/3");
        break;
      case "Wednesday":
        setColumn("3/4");
        break;
      case "Thursday":
        setColumn("4/5");
        break;
      case "Friday":
        setColumn("5/6");
        break;
      case "Saturday":
        setColumn("6/7");
        break;
      case "Sunday":
        setColumn("7/8");
        break;
    }
  }, [props.data.day]);

  return (
    <div style={{ gridColumn: column }}>
      {/* {props.portions?.length &&
        props.portions.map((el) => <p key={el}>{el.amount}</p>)} */}
      <p>{props.data.amount}gr. food</p>
    </div>
  );
}
