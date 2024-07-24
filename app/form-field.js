"use client";
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
  return (
    <div className={bem()}>
      <label htmlFor={id} className={bem("label")}>
        {label}
      </label>
      <input
        className={bem("input", invalid ? "error" : "")}
        type="text"
        onBlur={() => $setTouched(true)}
        onChange={(e) => {
          //validate(e);
          onChange(e);
        }}
        defaultValue={value}
      />
      <span className={bem("error", [invalid ? "active" : "inactive"])}>
        {error}
      </span>
    </div>
  );
};

export default FormField;
