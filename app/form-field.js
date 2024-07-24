"use client";
import Image from "next/image";
import blem from "blem";
import { useState, useEffect } from "react";
import "./form-field.scss";

export const FormField = (props) => {
  const { id, value, label, error, isValid, onChange } = props;
  const bem = blem("FormField");
  const [$value, $setValue] = useState("");
  const [$touched, $setTouched] = useState(false);
  // since right now the only way to make something invalid
  // is to skip filling it in, we don't need this
  //const [$dirty, $setDirty] = useState(false);
  //useEffect(() => {
  //  if ($value !== "") {
  //    $setDirty(true);
  //  }
  //}, [$value]);
  const invalid = $touched && !isValid;
  const errorClass = invalid ? "error" : "";
  return (
    <div className={bem("", errorClass)}>
      <label htmlFor={id} className={bem("label")}>
        {label}
      </label>
      <input
        className={bem("input", errorClass)}
        type="text"
        onBlur={() => $setTouched(true)}
        onChange={(e) => {
          //validate(e);
          onChange(e);
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
