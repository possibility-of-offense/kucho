import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FoodAddedBadge from "./FoodAddedBadge";
import AddFoodPortion from "./AddFoodPortion";
import "../styles/topbar.css";
import { DataContext } from "../App";

const TopBar = React.forwardRef((props, ref) => {
  const [days, setDays] = useState([]);
  const context = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();

  function handleClick() {
    const splitLocation = location.pathname.split("/");
    if (!splitLocation.includes("recommended")) {
      navigate("/today");
    }
  }

  return (
    <div className="top-bar box-shadow-2" ref={ref}>
      <div className="top-bar__home">
        <Link to="/">
          <img alt="Logo home" title="Logo Home" src="./pawprint.png" />
        </Link>
      </div>
      <div className="top-bar__rest">
        <div>
          <div onClick={handleClick}>
            <FoodAddedBadge alert={props.alert} />
          </div>
        </div>
        <div>
          <AddFoodPortion
            update={context.updatePortions}
            fillDays={setDays}
            days={days}
          />
        </div>
      </div>
    </div>
  );
});

export default TopBar;
