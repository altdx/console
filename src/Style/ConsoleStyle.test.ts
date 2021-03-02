// @ts-nocheck @ts-ignore
import colors from "ansi-colors";
import { assertEquals } from "../deps.ts";
import { consoleStyle as style } from "./mod.ts";

Deno.test("Altdx Console Style - should render modifiers", () => {
  assertEquals(
    colors.bold("hello"),
    style.bold().render("hello"),
  );

  style.reset().bold().dim().italic().underline().inverse().hidden()
    .strikethrough();
  assertEquals(
    colors.bold.dim.italic.underline.inverse.hidden.strikethrough("hello"),
    style.render("hello"),
  );
});

Deno.test("Altdx Console Style - should render normal color", () => {
  style.reset();
  assertEquals(
    colors.blue("hello"),
    style.color("blue").render("hello"),
  );
});

Deno.test("Altdx Console Style - should render light color", () => {
  style.reset();
  assertEquals(
    colors.blueBright("hello"),
    style.color("blue", true).render("hello"),
  );
});

Deno.test("Altdx Console Style - should render normal background color", () => {
  style.reset();
  assertEquals(
    colors.bgWhite("hello"),
    style.bgc("white").render("hello"),
  );
});

Deno.test("Altdx Console Style - should render light background color", () => {
  style.reset();
  assertEquals(
    colors.bgWhiteBright("hello"),
    style.bgc("white", true).render("hello"),
  );
});

Deno.test("Altdx Console Style - should reset style", () => {
  assertEquals("hello", style.reset().render("hello"));
});
