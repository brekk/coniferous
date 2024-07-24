import { dropNonDigits } from "./string";

export const formatCreditCard = (value) => {
  const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
  // (4 x 4) + 3 spaces === 19
  const raw = value.slice(0, 19).replace(/[^\d]/g, "");
  const formatted = raw.replace(regex, (regex, $1, $2, $3, $4) =>
    [$1, $2, $3, $4].filter((group) => !!group).join(" "),
  );
  return { formatted, newValue: dropNonDigits(value) };
};
export const formatExpiration = (value) => {
  const regex = /^(\d{0,2})(\d{0,2})$/g;
  const numbersAndSlashes = value.slice(0, 5).replace(/[^\d\/]/g, "");
  const formatted = numbersAndSlashes.replace(regex, (_, a, b) =>
    [a, b].filter((z) => z).join("/"),
  );
  return { formatted, newValue: value };
};
export const formatCVV = (value) => {
  const regex = /\D/g;
  const formatted = value.slice(0, 3).replace(/[^\d]/g, "");
  const newValue = formatted.replace(regex, "");
  return { formatted, newValue };
};
export const formatZip = (value) => {
  const regex = /\D/g;
  const formatted = value.slice(0, 5).replace(/[^\d]/g, "");
  const newValue = formatted.replace(regex, "");
  return { formatted, newValue };
};
