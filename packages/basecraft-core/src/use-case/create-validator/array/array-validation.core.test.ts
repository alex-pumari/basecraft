import { describe, expect, test } from "vitest";
import { string } from "../../../schema/string.core.js";
import { array } from "../../../schema/array.core.js";
import { number } from "../../../schema/number.core.js";
import { object } from "../../../schema/object.core.js";
import { boolean } from "../../../schema/boolean.core.js";
import { createValidator } from "../../create-validator.core.js";

describe("array-validation", () => {
  describe("array", () => {
    const validator = createValidator({ field: array() }).isValid;

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
        expect(validator({ field: value })).toBe(true);
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
        expect(validator({ field: value })).toBe(false);
      });
    });
  });

  describe("array with min and max length", () => {
    test("should accept arrays whose length is within the specified bounds", () => {
      const validator = createValidator({
        field: array().minLength(2).maxLength(4),
      }).isValid;

      const validValues = [
        [1, 2],
        [1, 2, 3],
        [1, 2, 3, 4],
      ];

      validValues.forEach((value) => {
        expect(validator({ field: value })).toBe(true);
      });
    });

    test("should reject arrays whose length is outside the specified bounds", () => {
      const validator = createValidator({
        field: array().minLength(2).maxLength(4),
      }).isValid;

      const invalidValues = [[], [1], [1, 2, 3, 4, 5]];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });
  });

  describe("item schema validation", () => {
    test("should accept empty arrays regardless of the item schema", () => {
      const validators = [
        createValidator({ field: array(string()) }).isValid,
        createValidator({ field: array(number()) }).isValid,
        createValidator({ field: array(boolean()) }).isValid,
        createValidator({ field: array(array()) }).isValid,
        createValidator({ field: array(array(number())) }).isValid,
        createValidator({
          field: array(object({ name: string() })),
        }).isValid,
      ];

      validators.forEach((validator) => {
        expect(validator({ field: [] })).toBe(true);
      });
    });

    test("should accept arrays whose items match the string schema", () => {
      const validator = createValidator({
        field: array(string()),
      }).isValid;

      expect(
        validator({ field: ["first-example", "second-example"] }),
      ).toBe(true);
    });

    test("should reject arrays containing items that do not match the string schema", () => {
      const validator = createValidator({
        field: array(string()),
      }).isValid;

      const invalidValues = [
        [1],
        [true],
        [null],
        [undefined],
        [{}],
        ["item-example", 1],
      ];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });

    test("should accept arrays whose items match the number schema", () => {
      const validator = createValidator({
        field: array(number()),
      }).isValid;

      expect(validator({ field: [1, 2, 3.5] })).toBe(true);
    });

    test("should reject arrays containing items that do not match the number schema", () => {
      const validator = createValidator({
        field: array(number()),
      }).isValid;

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
        expect(validator({ field: value })).toBe(false);
      });
    });

    test("should accept arrays whose items match the boolean schema", () => {
      const validator = createValidator({
        field: array(boolean()),
      }).isValid;

      expect(validator({ field: [true, false, true] })).toBe(true);
    });

    test("should reject arrays containing items that do not match the boolean schema", () => {
      const validator = createValidator({
        field: array(boolean()),
      }).isValid;

      const invalidValues = [
        [1],
        ["true"],
        [null],
        [undefined],
        [true, 1],
      ];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });

    test("should accept arrays whose items match the nested array schema", () => {
      const validator = createValidator({
        field: array(array(number())),
      }).isValid;

      expect(validator({ field: [[1, 2], [3, 4]] })).toBe(true);
    });

    test("should reject arrays containing items that do not match the nested array schema", () => {
      const validator = createValidator({
        field: array(array(number())),
      }).isValid;

      const invalidValues = [
        [1],
        [["item-example"]],
        [[1, "2"]],
        [[null]],
      ];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });

    test("should accept arrays containing valid objects", () => {
      const validator = createValidator({
        field: array(object({ name: string() })),
      }).isValid;

      expect(validator({ field: [{ name: "first-example" }] })).toBe(true);
      expect(
        validator({
          field: [
            { name: "first-example" },
            { name: "second-example" },
          ],
        }),
      ).toBe(true);
    });

    test("should reject arrays containing objects that do not match the object schema", () => {
      const validator = createValidator({
        field: array(object({ name: string() })),
      }).isValid;

      const invalidValues = [
        [{ name: 1 }],
        [{ name: null }],
        [{ surname: "doe" }],
      ];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });

    test("should reject arrays containing items that are not objects", () => {
      const validator = createValidator({
        field: array(object({ name: string() })),
      }).isValid;

      const invalidValues = [
        [1],
        ["item-example"],
        [null],
        [undefined],
        [true],
      ];

      invalidValues.forEach((value) => {
        expect(validator({ field: value })).toBe(false);
      });
    });
  });

  describe("combined constraints", () => {
    test("should accept arrays that satisfy the item schema, minimum length, maximum length, and contains constraints", () => {
      const validator = createValidator({
        field: array(string())
          .contains("target-example")
          .minLength(2)
          .maxLength(4),
      }).isValid;

      expect(
        validator({
          field: ["first-example", "target-example", "third-example"],
        }),
      ).toBe(true);
    });

    test("should reject arrays that violate the item schema despite satisfying the length constraints", () => {
      const validator = createValidator({
        field: array(string()).minLength(2).maxLength(4),
      }).isValid;

      expect(
        validator({
          field: ["first-example", 2],
        }),
      ).toBe(false);
    });

    test("should reject arrays that satisfy the item schema and length constraints but do not contain the required item", () => {
      const validator = createValidator({
        field: array(string())
          .contains("target-example")
          .minLength(2)
          .maxLength(4),
      }).isValid;

      expect(
        validator({
          field: ["first-example", "second-example"],
        }),
      ).toBe(false);
    });
  });
});