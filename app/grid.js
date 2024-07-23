import blem from "blem";
import "./grid.scss";

const Grid = () => {
  const bem = blem("Grid");
  return (
    <div className="grid">
      <div className={bem("line", "768")} />
    </div>
  );
};

export default Grid;
