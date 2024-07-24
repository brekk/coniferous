"use client";
import blem from "blem";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./home.scss";
import Grid from "./grid";
import Form from "./form";
import Button from "./button";
import Review from "./review-and-pay";

const dropNonDigits = (x) => x.replace(/\D/, "");

const PaymentFlow = ({ total }) => {
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
  const getValidDataFromFormData = () =>
    Object.fromEntries(
      Object.entries($formData).map(([k, v]) => [k, v !== ""]),
    );
  const [$validData, $setValidData] = useState(getValidDataFromFormData());
  const goForward = () => {
    const next = ($step + 1) % steps.length;
    console.log("moving forward!", next);
    $setStep(next);
  };
  const goBack = () => {
    const prev = ($step - 1) % steps.length;
    console.log("moving forward!", prev);
    $setStep(prev);
  };
  const dataForField = (field) => $formData[field] || "";
  const formatters = {
    creditCard: (field, value, ref) => {
      const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
      // (4 x 4) + 3 spaces === 19
      const onlyNumbers = ref.current.value.slice(0, 19).replace(/[^\d]/g, "");

      const formatted = onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) =>
        [$1, $2, $3, $4].filter((group) => !!group).join(" "),
      );
      ref.current.value = formatted;
      const storedValue = dropNonDigits(ref.current.value);
      $setFormData({
        ...$formData,
        [field]: storedValue,
      });
    },
    expiration: (field, value, ref) => {
      const regex = /^(\d{0,2})(\d{0,2})$/g;
      const numbersAndSlashes = ref.current.value
        .slice(0, 5)
        .replace(/[^\d\/]/g, "");
      const formatted = numbersAndSlashes.replace(regex, (_, a, b) =>
        [a, b].filter((z) => z).join("/"),
      );
      ref.current.value = formatted;
      $setFormData({
        ...$formData,
        [field]: value,
      });
    },
    cvv: (field, value, ref) => {
      const regex = /\D/g;
      const set = ref.current.value.slice(0, 3).replace(/[^\d]/g, "");
      ref.current.value = set.replace(regex, "");
      $setFormData({
        ...$formData,
        [field]: value,
      });
    },
    zip: (field, value, ref) => {
      const regex = /\D/g;
      const set = ref.current.value.slice(0, 5).replace(/[^\d]/g, "");
      ref.current.value = set.replace(regex, "");
      $setFormData({
        ...$formData,
        [field]: value,
      });
    },
  };
  const updateForField = (field) => (event, ref) => {
    let value = event?.target?.value ?? "";
    const formatter = formatters[field] || false;
    if (formatter) {
      formatter(field, value, ref);
    } else {
      $setFormData({
        ...$formData,
        [field]: value,
      });
    }
  };
  useEffect(() => {
    const validated = getValidDataFromFormData();
    $setValidData(validated);
  }, [$formData]);
  const formDataProps = (id) => ({
    id,
    value: dataForField(id),
    onChange: updateForField(id),
    isValid: $validData[id],
    error: "This field is required.",
  });
  const steps = [
    <div className={bem("step", "summary")}>
      <h1 className={bem("greeting")}>Hi, Taylor</h1>
      <p className={bem("summary")}>
        You have 6 medical bills ready from ABC Health System. You can pay your
        bills here or verify your identity to view full bill details.
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
      <Grid />
    </div>,
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
    <div className={bem("paid")}>Thank you for your payment!</div>,
  ];
  return <section className={bem("steps")}>{steps[$step] || null}</section>;
};

export default function Home() {
  const bem = blem("Home");
  return (
    <main className={bem("")}>
      <header className={bem("header")}>
        <Image
          className={bem("logo")}
          src="/logo.svg"
          alt="ABC Health System"
          width={158}
          height={80}
          priority
        />
      </header>
      <PaymentFlow total={"600.00"} />
    </main>
  );
}
