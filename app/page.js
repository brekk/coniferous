import blem from "blem";
import Image from "next/image";
import styles from "./home.scss";
import { PaymentFlow } from "./payment";

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
      <PaymentFlow total={"600.00"} user="Taylor" totalBills={6} />
    </main>
  );
}
