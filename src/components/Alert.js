export default function Alert(props) {
  return (
    <div className={`alert-bottom ${props.success ? "success" : ""}`}>
      {props.children}
    </div>
  );
}
