import blem from "blem";
import "./review-and-pay.scss";
import Button from "./button";
import Image from "next/image";

export const Review = ({ formDataProps, goBack, goForward, total }) => {
  const bem = blem("Review");
  const lastFour = formDataProps("creditCard").value.slice(-4);
  return (
    <>
      <div className={bem("form-wrapper")}>
        <h2 className={bem("form-heading", "inactive")}>
          <span className={bem("form-step", "inactive")}>1</span>
          Payment information
          <div className={bem("edit-payment")} onClick={goBack}>
            Edit
          </div>
        </h2>
      </div>
      <div className={bem("review-and-pay")}>
        <h2 className={bem("form-heading", "active")}>
          <span className={bem("form-step", "active")}>2</span>
          Review and pay
        </h2>
        <div className={bem("summary")}>
          <p className={bem("summary-text")}>
            You're about to make a payment of <strong>${total}</strong>
          </p>
          <div className={bem("payment-method")}>
            <strong className={bem("payment-method-header")}>
              Payment method
            </strong>
            <div className={bem("payment-details")}>
              <Image
                className={bem("card")}
                src="/icon-visa.svg"
                alt="Pay with Visa"
                width={24}
                height={17}
                priority
              />
              Card ending in ····{lastFour}
            </div>
          </div>
          <Button className="final-pay" onClick={goForward}>
            Pay ${total}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Review;
