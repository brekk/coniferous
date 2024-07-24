"use client";

import blem from "blem";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./home.scss";
import Grid from "./grid";
import Form from "./form";
import Button from "./button";
import Review from "./review-and-pay";
import Summary from "./summary";

import { dropNonDigits } from "./fn/string";
import { nonEmptyFields } from "./fn/form";
import {
  formatExpiration,
  formatCVV,
  formatCreditCard,
  formatZip,
} from "./fn/formatters";

export const PaymentFlow = ({ total, user, totalBills }) => {
  const bem = blem("PaymentFlow");
  // by convention stateful values are prefixed with a $
  const [$step, $setStep] = useState(0);
  const [$formData, $setFormData] = useState({
    creditCard: "",
    expiration: "",
    cvv: "",
    name: "",
    zip: "",
  });
  const getValidDataFromFormData = () => nonEmptyFields($formData);
  const [$validData, $setValidData] = useState(getValidDataFromFormData());
  const go = (dir) => () => {
    const next = (dir ? $step + 1 : $step - 1) % steps.length;
    $setStep(next);
  };
  const goForward = go(true);
  const goBack = go(false);
  const dataForField = (field) => $formData[field] || "";
  const formatFieldWith = (fn) => (field, ref) => {
    const { formatted, newValue } = fn(ref.current.value);
    ref.current.value = formatted;
    $setFormData({
      ...$formData,
      [field]: newValue,
    });
  };
  const formatters = {
    creditCard: formatFieldWith(formatCreditCard),
    expiration: formatFieldWith(formatExpiration),
    cvv: formatFieldWith(formatCVV),
    zip: formatFieldWith(formatZip),
  };
  const updateForField = (field) => (event, ref) => {
    const value = event?.target?.value ?? "";
    const formatter = formatters[field] || false;
    if (formatter) {
      formatter(field, ref);
    } else {
      $setFormData({
        ...$formData,
        [field]: value,
      });
    }
  };
  useEffect(() => {
    $setValidData(getValidDataFromFormData());
  }, [$formData]);
  const formDataProps = (id) => ({
    id,
    value: dataForField(id),
    onChange: updateForField(id),
    isValid: $validData[id],
    error: "This field is required.",
  });
  const steps = [
    <Summary
      goForward={goForward}
      user={user}
      total={total}
      totalBills={totalBills}
    />,
    <Form
      formDataProps={formDataProps}
      goForward={goForward}
      checkValid={() => !Object.values($validData).some((y) => !y)}
    />,
    <Review
      formDataProps={formDataProps}
      goForward={goForward}
      goBack={goBack}
      total={total}
    />,
    <div className={"Summary__paid"}>Thank you for your payment!</div>,
  ];
  return <section className={bem("steps")}>{steps[$step] || null}</section>;
};
export default PaymentFlow;
