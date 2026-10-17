import { describe, expect, test } from "vitest";
import { string } from "../string/string.core.js";
import { array } from "./array.core.js";
import { number } from "../number/number.core.js";
import { object } from "../object/object.core.js";
import { boolean } from "../boolean/boolean.core.js";

describe("array-validations", () => {
  describe("array", () => {
    const validator = array().isValid;

    test("should accept arrays of any item type", () => {
      const validValues = [
        [],
        [1, 2, 3],
        ["item-example", "other-example"],
        [true, false],
        [null, undefined],
        [{ field: "value-example" }],
        [[1, 2], ["item-example"]],
      ];

      validValues.forEach((value) => {
        expect(validator(value)).toBe(true);
      });
    });

    test("should reject values that are not arrays", () => {
      const invalidValues = [
        undefined,
        null,
        "",
        "string-example",
        0,
        1,
        NaN,
        Infinity,
        true,
        false,
        {},
        { length: 2 },
        Symbol("symbol-example"),
      ];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });

  describe("item schema validation", () => {
    test("should accept empty arrays regardless of the item schema", () => {
      const validators = [
        array(string()).isValid,
        array(number()).isValid,
        array(boolean()).isValid,
        array(array()).isValid,
        array(array(number())).isValid,
        array(object({ name: string() })).isValid,
      ];

      validators.forEach((validator) => {
        expect(validator([])).toBe(true);
      });
    });

    test("should accept arrays whose items match the string schema", () => {
      const validator = array(string()).isValid;

      expect(validator(["first-example", "second-example"])).toBe(true);
    });

    test("should reject arrays containing items that do not match the string schema", () => {
      const validator = array(string()).isValid;

      const invalidValues = [
        [1],
        [true],
        [null],
        [undefined],
        [{}],
        ["item-example", 1],
      ];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });

    test("should accept arrays whose items match the number schema", () => {
      const validator = array(number()).isValid;

      expect(validator([1, 2, 3.5])).toBe(true);
    });

    test("should reject arrays containing items that do not match the number schema", () => {
      const validator = array(number()).isValid;

      const invalidValues = [
        ["1"],
        [true],
        [null],
        [undefined],
        [NaN],
        [Infinity],
        [1, "2"],
      ];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });

    test("should accept arrays whose items match the boolean schema", () => {
      const validator = array(boolean()).isValid;

      expect(validator([true, false, true])).toBe(true);
    });

    test("should reject arrays containing items that do not match the boolean schema", () => {
      const validator = array(boolean()).isValid;

      const invalidValues = [[1], ["true"], [null], [undefined], [true, 1]];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });

    test("should accept arrays whose items match the nested array schema", () => {
      const validator = array(array(number())).isValid;

      expect(
        validator([
          [1, 2],
          [3, 4],
        ]),
      ).toBe(true);
    });

    test("should reject arrays containing items that do not match the nested array schema", () => {
      const validator = array(array(number())).isValid;

      const invalidValues = [[1], [["item-example"]], [[1, "2"]], [[null]]];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });

    test("should accept arrays containing valid objects", () => {
      const validator = array(object({ name: string() })).isValid;

      expect(validator([{ name: "first-example" }])).toBe(true);
      expect(
        validator([{ name: "first-example" }, { name: "second-example" }]),
      ).toBe(true);
    });

    test("should reject arrays containing objects that do not match the object schema", () => {
      const validator = array(object({ name: string() })).isValid;

      const invalidValues = [
        [{ name: 1 }],
        [{ name: null }],
        [{ surname: "doe" }],
      ];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });

    test("should reject arrays containing items that are not objects", () => {
      const validator = array(object({ name: string() })).isValid;

      const invalidValues = [
        [1],
        ["item-example"],
        [null],
        [undefined],
        [true],
      ];

      invalidValues.forEach((value) => {
        expect(validator(value)).toBe(false);
      });
    });
  });
});
