import { useContext } from "react";
import { DataContext } from "../App";

export default function SeeFavoriteFoods() {
  const context = useContext(DataContext);

  return (
    <div className="see-favorite-foods">
      <h2>Favorite Foods</h2>
      <div className="box-shadow-2">
        {context?.favorites.length > 0 ? (
          context.favorites.map((el) => <p key={el}>{el}</p>)
        ) : (
          <h4 style={{ padding: "6px" }}>No favorite foods yet!</h4>
        )}
      </div>
    </div>
  );
}
