import blem from "blem";
import FormField from "./form-field";
import "./form.scss";
import Button from "./button";

export const Form = ({ formDataProps, goForward }) => {
  const bem = blem("Form");
  return (
    <div className={bem("form-wrapper")}>
      <h2 className={bem("form-heading")}>
        <span className={bem("form-step", "1")}>1</span>
        Payment information
      </h2>
      <div className={bem("form")}>
        <FormField label="Card number" {...formDataProps("credit-card")} />
        <div className={bem("across", ["two"])}>
          <FormField label="Expires (MM/YY)" {...formDataProps("expiration")} />
          <FormField label="Security Code (CVV)" {...formDataProps("cvv")} />
        </div>
        <FormField label="Name on card" {...formDataProps("name")} />
        <FormField label="ZIP code" {...formDataProps("zip")} />
        <Button onClick={goForward}>Continue</Button>
      </div>
    </div>
  );
};

export default Form;
