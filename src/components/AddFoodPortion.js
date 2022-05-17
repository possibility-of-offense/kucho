import {
  useCallback,
  useContext,
  useReducer,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import { SetRecommendations } from "../App";
import Alert from "./Alert";

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        ...state,
        amount: action.payload.amount,
      };
    case "day":
      return {
        ...state,
        day: action.payload.day,
      };
    case "prefill":
      return {
        ...state,
        prefill: action.payload.prefill,
      };
    case "submit":
      return state;
    case "init":
      return {
        ...state,
        day: "Monday",
      };
    case "reset":
      state = { day: "", amount: "", prefill: "" };
      return state;
    default:
      return state;
  }
}

export default function AddFoodPortion({ update, fillDays, days }) {
  const rec = useContext(SetRecommendations);

  const [state, dispatch] = useReducer(reducer, {
    amount: "",
    day: "",
    prefill: "",
  });

  const [showing, setShowing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const foodAmountRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    dispatch({
      type: "prefill",
      payload: { prefill: rec.prefill > 0 ? rec.prefill : "" },
    });
  }, [rec.prefill]);

  function handleFoodInput(val) {
    if (foodAmountRef.current) {
      if (val === "focus") {
        foodAmountRef.current.classList.add("active");
      }
      if (val === "blur") {
        if (!state.amount) {
          foodAmountRef.current.classList.remove("active");
        }
      }
    }
  }

  const handleClick = useCallback(
    (e) => {
      setShowing(showing ? false : true);
    },
    [showing]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!state.day || !state.amount) {
      setShowAlert(true);
      dispatch({ type: "reset" });
      return;
    }

    const calcPortion = +state.amount + +state.prefill;

    update({ amount: calcPortion, day: state.day });
    rec.cb(calcPortion);

    setShowing(false);

    fillDays((prev) => [...prev, state.day]);
    dispatch({ type: "reset" });
  };

  return (
    <div className={`add-food-portion ${showing ? "show-form" : ""}`}>
      <button
        onClick={() => setShowing((prevValue) => !prevValue)}
        className="btn-1 box-shadow-1"
      >
        Add Food
      </button>

      {showing && (
        <>
          {showAlert && <Alert>Pick a day/food portion</Alert>}
          <div className="overlay" onClick={handleClick}></div>
          <form
            onSubmit={handleSubmit}
            className="add-food-portion__form box-shadow-2"
          >
            <h3>Add Food</h3>
            {state.prefill && (
              <p>
                <small>
                  {" "}
                  <strong>
                    You need to add {state.prefill} to your next portion in
                    order to give the recommended portion!
                  </strong>
                </small>
              </p>
            )}
            <div ref={foodAmountRef}>
              <label>Food Amount</label>
              <input
                type="text"
                value={state.amount}
                ref={inputRef}
                onChange={(e) =>
                  dispatch({ type: "add", payload: { amount: e.target.value } })
                }
                onFocus={handleFoodInput.bind(null, "focus")}
                onBlur={handleFoodInput.bind(null, "blur")}
              />
            </div>
            <br />
            <div className="select">
              <label>Day of the week</label>
              <select
                value={state.day}
                onChange={(e) =>
                  dispatch({ type: "day", payload: { day: e.target.value } })
                }
              >
                <option value="">Pick an option</option>
                <option
                  value="Monday"
                  disabled={days.includes("Monday") ? true : false}
                >
                  Monday
                </option>
                <option
                  value="Tuesday"
                  disabled={days.includes("Tuesday") ? true : false}
                >
                  Tuesday
                </option>
                <option
                  value="Wednesday"
                  disabled={days.includes("Wednesday") ? true : false}
                >
                  Wednesday
                </option>
                <option
                  value="Thursday"
                  disabled={days.includes("Thursday") ? true : false}
                >
                  Thursday
                </option>
                <option
                  value="Friday"
                  disabled={days.includes("Friday") ? true : false}
                >
                  Friday
                </option>
                <option
                  value="Saturday"
                  disabled={days.includes("Saturday") ? true : false}
                >
                  Saturday
                </option>
                <option
                  value="Sunday"
                  disabled={days.includes("Sunday") ? true : false}
                >
                  Sunday
                </option>
              </select>
            </div>

            <br />
            <button className="btn-2">Add</button>
          </form>
        </>
      )}
    </div>
  );
}
