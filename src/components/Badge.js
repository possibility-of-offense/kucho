import { useEffect, useLayoutEffect, useRef } from "react";

export default function Badge(props) {
  const divRef = useRef(null);

  useLayoutEffect(() => {
    props.alert.value && divRef.current.classList.add("animate__headShake");
    return () => {
      divRef.current.classList.remove("animate__headShake");
    };
  }, [props.alert]);

  return (
    <div
      ref={divRef}
      style={props.styling}
      className={`badge animate__animated ${
        props.classAttr && props.classAttr
      } `}
    >
      {props.children}
    </div>
  );
}
