import { nonEmptyFields } from "./form";

import { expect, test } from "vitest";

test("nonEmptyFields", () => {
  expect(nonEmptyFields({ a: 1, b: 2, c: 3 })).toEqual({
    a: true,
    b: true,
    c: true,
  });
  expect(nonEmptyFields({ a: "", b: "", c: 3 })).toEqual({
    a: false,
    b: false,
    c: true,
  });
});
