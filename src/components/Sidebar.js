import { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext, TopBarHeightContext } from "../App";
import "../styles/sidebar.css";

export default function Sidebar() {
  const context = useContext(DataContext);
  const topBarHeight = useContext(TopBarHeightContext);

  function handleClick(v) {
    context.updatePortions(v);
  }

  function calcHeight(heightToWithdraw) {
    if (heightToWithdraw) {
      const res = 100 - heightToWithdraw * 0.2;
      return `${res}vh`;
    }
  }

  return (
    <aside className="sidebar" style={{ minHeight: calcHeight(topBarHeight) }}>
      <div className="sidebar__info box-shadow-1">
        <p>
          <span>Name:</span> {context?.info?.name}
        </p>
        <p>
          <span>Age:</span> {context?.info?.age} years
        </p>
        <p
          onClick={() =>
            handleClick({
              id: "monday",
              portion: 300,
            })
          }
        >
          {/* TODO add aspect ratio */}
          <img className="box-shadow-2" src={context?.info?.url} />
        </p>
        {/* <p>
          {context?.portions.map((el) => (
            <span key={el.id}>{el.portion}</span>
          ))}
        </p> */}
      </div>
      <div className="sidebar__routes">
        <Link className="btn-2" to="/kucho/today">
          Today information
        </Link>
        <br />
        <Link className="btn-2" to="/kucho/foods/see-favorite-foods">
          Favorite Foods
        </Link>
      </div>
    </aside>
  );
}
