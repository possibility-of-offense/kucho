import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Today from "./views/Today";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import "./index.css";
import "./styles/app.css";
import FavouriteFoods from "./views/FavouriteFoods";

const data = {
  name: "Kucho",
  age: 8,
  url: "https://scontent-sof1-1.xx.fbcdn.net/v/t39.30808-1/269981398_3107184919603839_1541037421008093540_n.jpg?stp=c0.51.160.160a_dst-jpg_p160x160&_nc_cat=110&ccb=1-6&_nc_sid=7206a8&_nc_ohc=GVQEYlKvznMAX8DOtVM&_nc_ht=scontent-sof1-1.xx&oh=00_AT_g8P5HMfjdQluk9ia1gnbgZbmW20UEiHm5jHL3NnLYeQ&oe=6287B7C0",
  foodPortions: [],
  favoriteFoods: [],
};

export const DataContext = React.createContext(data);
export const TopBarHeightContext = React.createContext();
export const TodayFoodContext = React.createContext();

export default function App() {
  const [info, setInfo] = useState({
    name: data.name,
    age: data.age,
    url: data.url,
  });
  const [portions, setPortions] = useState(data.foodPortions);
  const [favorites, setFavorites] = useState(data.favoriteFoods);
  const [height, setHeight] = useState(0);
  const [alertBadge, setAlertBadge] = useState({ value: false, amount: 0 });

  const topBarRef = useRef(null);

  useLayoutEffect(() => {
    setHeight(topBarRef.current.getBoundingClientRect().height);
  }, []);

  function updatePortions(v) {
    setPortions((prev) => [...prev, v]);
    data.foodPortions = portions;
    setAlertBadge({ value: true, amount: 0 });
  }

  function setFavoriteFood(v) {
    const newF = [...favorites, v];
    setFavorites(newF);
    data.favoriteFoods = favorites;
  }

  return (
    <>
      <BrowserRouter>
        <DataContext.Provider
          value={{
            info: {
              name: info.name,
              age: info.age,
              url: info.url,
            },
            portions: portions,
            favorites: favorites,
            updatePortions: updatePortions,
            setFavoriteFood: setFavoriteFood,
          }}
        >
          <TopBar ref={topBarRef} alert={alertBadge} />
          <div className="app-main">
            <TodayFoodContext.Provider
              value={{ portions: portions.slice().pop() }}
            >
              <TopBarHeightContext.Provider value={height}>
                <Sidebar />
              </TopBarHeightContext.Provider>
              <div>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/today/*" element={<Today />} />
                  <Route path="/foods/*" element={<FavouriteFoods />} />
                </Routes>
              </div>
            </TodayFoodContext.Provider>
          </div>
        </DataContext.Provider>
      </BrowserRouter>
    </>
  );
}
