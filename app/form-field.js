"use client";
import blem from "blem";
import { useState, useEffect } from "react";
import "./form-field.scss";

export const FormField = ({ id, value, label, error, onUpdate }) => {
  const bem = blem("FormField");
  const [$value, $setValue] = useState("");
  const [$error, $setError] = useState(false);
  const [$dirty, $setDirty] = useState(false);
  useEffect(() => {
    if ($value !== "") {
      $setDirty(true);
    }
  }, [$value]);
  return (
    <div className={bem()}>
      <label htmlFor={id} className={bem("label")}>
        {label}
      </label>
      <input
        className={bem("input")}
        type="text"
        onChange={onUpdate}
        defaultValue={value}
      />
      <span
        className={bem("error", [$error && $dirty ? "active" : "inactive"])}
      >
        {error}
      </span>
    </div>
  );
};

export default FormField;
