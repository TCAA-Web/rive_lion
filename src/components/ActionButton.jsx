export const ActionButton = ({ callback, text }) => {
  const styles = {
    width: "160px",
    height: "40px",
    border: "solid 1px black",
    backgroundColor: "rgba(240,240,240,1)",
    color: "black",
    textAlign: "center",
  };

  return (
    <button style={{ ...styles }} onClick={callback}>
      {text}
    </button>
  );
};
