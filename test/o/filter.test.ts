import { expect, test } from "vitest";
import { filter } from "o-util";

const o = {
  name: null,
  age: 20,
  nested: {
    m: 20,
    n: undefined,
  },
};

test("should remove name property from o", () => {
  const obj = filter(o, (v) => v !== null);
  const { name: _, ...rest } = o;
  expect(obj?.name).toBeUndefined();
  expect(obj).toStrictEqual(rest);
});

test("should remove name, m and n inside nested object", () => {
  const obj = filter(o, (v) => !!v);
  expect(obj).toStrictEqual({ nested: { m: 20 }, age: 20 });
});

test("should remove age, nested object, except name", () => {
  const obj = filter(o, (v) => v === null);

  expect(obj).toStrictEqual({ name: o.name });
});
