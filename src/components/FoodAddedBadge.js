import { useMemo } from "react";
import Badge from "./Badge";

export default function FoodAddedBadge({ alert }) {
  const styleObj = useMemo(() => {
    return {
      backgroundColor: "#f4f4f4",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      width: "40px",
      height: "40px",
      cursor: "pointer",
    };
  }, []);

  return (
    <>
      <Badge
        alert={alert}
        classAttr="food-added box-shadow-2"
        styling={styleObj}
      >
        <h4>
          <span className="material-symbols-outlined">notifications</span>
        </h4>
      </Badge>
    </>
  );
}
