// @ts-ignore
import figures from "figures";
// @ts-ignore
import { assertEquals } from "testing/asserts.ts";

import { ConsoleFigure, consoleFigure } from "./mod.ts";

const methods: string[] = Object.getOwnPropertyNames(ConsoleFigure.prototype);

methods.map((method) => {
  if (method === "constructor") {
    return method;
  }

  Deno.test(`should render ${method}`, () => {
    if (method === "square") {
      assertEquals(figures.squareSmall, consoleFigure.square());

      return;
    }

    if (method === "squareFilled") {
      assertEquals(figures.squareSmallFilled, consoleFigure.squareFilled());

      return;
    }

    // @ts-ignore
    assertEquals(figures[method], consoleFigure[method]());
  });

  return method;
});
