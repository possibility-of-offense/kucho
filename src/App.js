import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Today from "./views/Today";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import "./index.css";
import "./styles/app.css";
import FavouriteFoods from "./views/FavouriteFoods";
import sound from "./dog.mp3";

const data = {
  name: "Kucho",
  age: 8,
  url: "https://scontent-sof1-1.xx.fbcdn.net/v/t39.30808-1/269981398_3107184919603839_1541037421008093540_n.jpg?stp=c0.51.160.160a_dst-jpg_p160x160&_nc_cat=110&ccb=1-6&_nc_sid=7206a8&_nc_ohc=GVQEYlKvznMAX8DOtVM&_nc_ht=scontent-sof1-1.xx&oh=00_AT_g8P5HMfjdQluk9ia1gnbgZbmW20UEiHm5jHL3NnLYeQ&oe=6287B7C0",
  foodPortions: [],
  favoriteFoods: [],
  recommended: "",
  overall: 0,
};

export const DataContext = React.createContext(data);
export const TopBarHeightContext = React.createContext();
export const TodayFoodContext = React.createContext();
export const SetRecommendations = React.createContext();

export default function App() {
  const [info, setInfo] = useState({
    name: data.name,
    age: data.age,
    url: data.url,
  });
  const [portions, setPortions] = useState(() => data.foodPortions);
  const [favorites, setFavorites] = useState(() => data.favoriteFoods);
  const [overall, setOverall] = useState(0);
  const [rec, setRec] = useState("");
  const [height, setHeight] = useState(0);
  const [prefill, setPrefill] = useState(0);
  const [audio, setAudio] = useState(() => new Audio(sound));
  const [alertBadge, setAlertBadge] = useState({ value: false, amount: 0 });

  const topBarRef = useRef(null);

  useLayoutEffect(() => {
    setHeight(topBarRef.current.getBoundingClientRect().height);
  }, []);

  const recCallback = useCallback((val) => {
    if (Number(val) < 100) {
      setRec("The recommended portion should be bigger than 100!");
      alert("The dog is not happy with the portion!");
      audio.play();
      setPrefill(100 - Number(val));
      return rec;
    } else {
      setRec(
        `The dog is being feed with the recommended food portion of ${val}!`
      );
      setPrefill(false);

      return rec;
    }
  }, []);

  function updatePortions(v) {
    setPortions((prev) => prev.concat(v));
    if (!portions.length) {
      setOverall(Number(v.amount));
    } else {
      const reduced =
        portions.slice().reduce((acc, cur) => acc + cur.amount, 0) +
        Number(v.amount);

      setOverall(reduced);
    }
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
            overall: overall,
            updatePortions: updatePortions,
            setFavoriteFood: setFavoriteFood,
          }}
        >
          <SetRecommendations.Provider
            value={{ cb: recCallback, rec, prefill }}
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
                    <Route path="/kucho/" element={<Home />} />
                    <Route path="/kucho/today/*" element={<Today />} />
                    <Route path="/kucho/foods/*" element={<FavouriteFoods />} />
                  </Routes>
                </div>
              </TodayFoodContext.Provider>
            </div>
          </SetRecommendations.Provider>
        </DataContext.Provider>
      </BrowserRouter>
    </>
  );
}
