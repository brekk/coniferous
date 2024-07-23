import "./button.scss";
import blem from "blem";

export const Button = ({ className = "", onClick, children }) => {
  const bem = blem("Button");
  return (
    <button className={bem("", className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
