import {
  formatZip,
  formatCVV,
  formatCreditCard,
  formatExpiration,
} from "./formatters";

import { expect, test } from "vitest";

test("formatCreditCard", () => {
  expect(formatCreditCard("abcde")).toEqual({
    formatted: "",
    newValue: "bcde",
  });
  expect(formatCreditCard("123456789012345")).toEqual({
    formatted: "1234 5678 9012 345",
    newValue: "123456789012345",
  });
});

test("formatExpiration", () => {
  expect(formatExpiration("abcde")).toEqual({
    formatted: "",
    newValue: "abcde",
  });
  expect(formatExpiration("123456789012345")).toEqual({
    formatted: "12345",
    newValue: "123456789012345",
  });
});

test("formatCVV", () => {
  expect(formatCVV("abcde")).toEqual({
    formatted: "",
    newValue: "",
  });
  expect(formatCVV("123456789012345")).toEqual({
    formatted: "123",
    newValue: "123",
  });
});

test("formatZip", () => {
  expect(formatZip("abcde")).toEqual({
    formatted: "",
    newValue: "",
  });
  expect(formatZip("123456789012345")).toEqual({
    formatted: "12345",
    newValue: "12345",
  });
});
