"use client";
import blem from "blem";
import Image from "next/image";
import { useState } from "react";
import styles from "./home.scss";
import Grid from "./grid";

const PaymentFlow = ({ total }) => {
  // by convention stateful values are prefixed with a $
  const [$step, $setStep] = useState(0);
  const bem = blem("PaymentFlow");

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
        <button className={bem("button", "pay")}>Pay total</button>
      </div>
      <Grid />
    </div>,
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
