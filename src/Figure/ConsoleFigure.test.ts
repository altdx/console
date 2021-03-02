// @ts-nocheck @ts-ignore
import figures from "figures";
import { assertEquals } from "../deps.ts";
import { ConsoleFigure, consoleFigure } from "./mod.ts";

const methods: string[] = Object.getOwnPropertyNames(ConsoleFigure.prototype);

methods.map((method) => {
  if (method === "constructor") {
    return method;
  }

  Deno.test(`Altdx Console Figure - should render ${method}`, () => {
    if (method === "square") {
      assertEquals(figures.squareSmall, consoleFigure.square());

      return;
    }

    if (method === "squareFilled") {
      assertEquals(figures.squareSmallFilled, consoleFigure.squareFilled());

      return;
    }

    // @ts-nocheck @ts-ignore
    assertEquals(figures[method], consoleFigure[method]());
  });

  return method;
});
