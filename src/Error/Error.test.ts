import { assertEquals, assertNotEquals } from "../deps.ts";
import { Error } from "./mod.ts";

Deno.test("Altdx Error - Should handle error message and error status", () => {
  // let stack = "at processResponse (deno:core/core.js:212:11)";
  let error = new Error("My error message", 1);
  assertEquals("My error message", error.getMessage());
  assertEquals(1, error.getStatus());
  assertNotEquals(0, error.getStatus());

  // stack = "at deno:core/core.js:212:11";
  // errorStack = new ErrorStack(stack);
  // assertEquals(null, errorStack.getMethod());
  // assertEquals("212", errorStack.getLine());
  // assertEquals("11", errorStack.getColumn());
  // assertEquals("deno:core/core.js", errorStack.getFile());
  // assertEquals(true, errorStack.isNative());
});
