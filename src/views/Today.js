import TodayFood from "../components/TodayFood";
import OverallFoodPortion from "../components/OverallFoodPortion";
import "../styles/today.css";
import { Link, Route, Routes } from "react-router-dom";
import Recommended from "../components/Recommended";

export default function Today() {
  return (
    <div className="today box-shadow-2">
      <div className="today-recommended">
        <Link className="btn-3 box-shadow-2" to="recommended">
          Recommended Food Portion
        </Link>
        <Routes>
          <Route path="recommended" element={<Recommended />} />
        </Routes>
      </div>

      <TodayFood />
      <OverallFoodPortion />
    </div>
  );
}
