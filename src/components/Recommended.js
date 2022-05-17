import { useContext } from "react";
import { DataContext, SetRecommendations } from "../App";
import "../styles/recommended.css";

export default function Recommended() {
  const context = useContext(SetRecommendations);

  return (
    <div className="recommended">
      <h2>Recommended</h2>
      <p>{context.rec ? context.rec : "No recommendations yet!"}</p>
    </div>
  );
}
