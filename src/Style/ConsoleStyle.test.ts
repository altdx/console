import {
  bgBrightWhite,
  bgWhite,
  blue,
  bold,
  brightBlue,
  dim,
  hidden,
  inverse,
  italic,
  strikethrough,
  underline,
} from "https://deno.land/std@0.92.0/fmt/colors.ts";
import { assertEquals } from "../deps.ts";
import { ConsoleStyle } from "./mod.ts";

const style = new ConsoleStyle();

Deno.test("Altdx Console Style - should render modifiers", () => {
  assertEquals(bold("hello"), style.bold().render("hello"));

  style.reset().strikethrough().hidden().inverse().underline().italic().dim().bold();
  assertEquals(
    bold(dim(italic(underline(inverse(hidden(strikethrough("hello"))))))),
    style.render("hello"),
  );
});

Deno.test("Altdx Console Style - should render normal color", () => {
  style.reset();
  assertEquals(blue("hello"), style.color("blue").render("hello"));
});

Deno.test("Altdx Console Style - should render light color", () => {
  style.reset();
  assertEquals(
    brightBlue("hello"),
    style.color("blue", true).render("hello"),
  );
});

Deno.test("Altdx Console Style - should render normal background color", () => {
  style.reset();
  assertEquals(bgWhite("hello"), style.bgc("white").render("hello"));
});

Deno.test("Altdx Console Style - should render light background color", () => {
  style.reset();
  assertEquals(
    bgBrightWhite("hello"),
    style.bgc("white", true).render("hello"),
  );
});

Deno.test("Altdx Console Style - should reset style", () => {
  assertEquals("hello", style.reset().render("hello"));
});
