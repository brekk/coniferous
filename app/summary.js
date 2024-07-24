import blem from "blem";
import "./summary.scss";
import Button from "./button";

export const Summary = ({ totalBills, goForward, user, total }) => {
  const bem = blem("Summary");
  return (
    <div className={bem("step", "summary")}>
      <h1 className={bem("greeting")}>Hi, {user}</h1>
      <p className={bem("summary")}>
        You have {totalBills} medical bills ready from ABC Health System. You
        can pay your bills here or verify your identity to view full bill
        details.
      </p>
      <div className={bem("cta", "start")}>
        <div className={bem("cta-summary")}>
          <span className={bem("label", "total-due")}>Total due</span>
          <span className={bem("amount", "due")}>${total}</span>
        </div>
        <Button className="pay" onClick={goForward}>
          Pay total
        </Button>
      </div>
    </div>
  );
};
export default Summary;
