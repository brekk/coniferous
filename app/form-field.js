"use client";
import Image from "next/image";
import blem from "blem";
import { useState, useEffect, useRef } from "react";
import "./form-field.scss";

export const FormField = (props) => {
  const ref = useRef();
  const { id, value, label, error, isValid, onChange } = props;
  const bem = blem("FormField");
  const [$value, $setValue] = useState("");
  const [$touched, $setTouched] = useState(false);
  const invalid = $touched && !isValid;
  const errorClass = invalid ? "error" : "";
  return (
    <div className={bem("", errorClass)}>
      <label htmlFor={id} className={bem("label")}>
        {label}
      </label>
      <input
        ref={ref}
        className={bem("input", errorClass)}
        type="text"
        onBlur={() => $setTouched(true)}
        onChange={(e) => {
          onChange(e, ref);
        }}
        defaultValue={value}
      />
      {$touched && (
        <span className={bem("icon")}>
          <Image
            src={`/icon-${invalid ? "alert" : "check"}.svg`}
            alt={invalid ? "Error" : "Success"}
            width={24}
            height={24}
            priority
          />
        </span>
      )}
      <span className={bem("error-text", [invalid ? "active" : "inactive"])}>
        {error}
      </span>
    </div>
  );
};

export default FormField;
