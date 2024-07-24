import "./button.scss";
import blem from "blem";

export const Button = ({ className = "", onClick, children, disabled }) => {
  const bem = blem("Button");
  const classes = [className, disabled ? "disabled" : ""].filter(
    (z) => z !== "",
  );
  const cName = classes.length === 0 ? "Button" : bem("", classes);
  return (
    <button className={cName} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
