import { Link, Route, Routes } from "react-router-dom";
import AddFavoriteFood from "../components/AddFavoriteFood";
import SeeFavoriteFoods from "../components/SeeFavoriteFoods";
import "../styles/favorite.css";

export default function FavouriteFoods() {
  return (
    <div className="favorite-foods-wrapper box-shadow-1">
      <div className="favorite-foods-wrapper__header">
        <Link className="btn-2" to="see-favorite-foods">
          See Favorite Foods
        </Link>
        <Link className="btn-2" to="add-favorite-food">
          Add Favorite Food
        </Link>
      </div>
      <Routes>
        <Route index path="see-favorite-foods" element={<SeeFavoriteFoods />} />
        <Route path="add-favorite-food" element={<AddFavoriteFood />} />
      </Routes>
    </div>
  );
}
