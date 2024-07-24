export const nonEmptyFields = (formData) =>
  Object.fromEntries(Object.entries(formData).map(([k, v]) => [k, v !== ""]));
