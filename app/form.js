import blem from "blem";
import FormField from "./form-field";
import "./form.scss";
import Button from "./button";

export const Form = ({ checkValid, formDataProps, goForward }) => {
  const isValid = checkValid();
  const bem = blem("Form");
  return (
    <div className={bem("")}>
      <div className={bem("form-wrapper")}>
        <h2 className={bem("form-heading", "active")}>
          <span className={bem("form-step", "active")}>1</span>
          Payment information
        </h2>
        <div className={bem("form")}>
          <FormField label="Card number" {...formDataProps("creditCard")} />
          <div className={bem("across", ["two"])}>
            <FormField
              label="Expires (MM/YY)"
              {...formDataProps("expiration")}
            />
            <FormField label="Security Code (CVV)" {...formDataProps("cvv")} />
          </div>
          <FormField label="Name on card" {...formDataProps("name")} />
          <FormField label="ZIP code" {...formDataProps("zip")} />
          <Button
            onClick={() => {
              if (isValid) {
                goForward();
              }
            }}
            disabled={!isValid}
          >
            Continue
          </Button>
        </div>
      </div>
      <div className={bem("review-and-pay")}>
        <h2 className={bem("form-heading", "inactive")}>
          <span className={bem("form-step", "inactive")}>2</span>
          Review and pay
        </h2>
      </div>
    </div>
  );
};

export default Form;
