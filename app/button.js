import "./button.scss";
import blem from "blem";

export const Button = ({ className = "", onClick, children, disabled }) => {
  const bem = blem("Button");
  const classes = [className, disabled ? "disabled" : ""].filter(
    (z) => z !== "",
  );
  return (
    <button
      className={`Button ${bem("", classes)}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
