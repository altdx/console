import { assertEquals } from "../deps.ts";
import { ErrorStack } from "./mod.ts";

Deno.test("Altdx Error Stack - Should have method, file, line and column", () => {
  let stack = "at processResponse (deno:core/core.js:212:11)";
  let errorStack = new ErrorStack(stack);
  assertEquals("processResponse", errorStack.getMethod());
  assertEquals("212", errorStack.getLine());
  assertEquals("11", errorStack.getColumn());
  assertEquals("deno:core/core.js", errorStack.getFile());
  assertEquals(true, errorStack.isNative());

  stack = "at deno:core/core.js:212:11";
  errorStack = new ErrorStack(stack);
  assertEquals(null, errorStack.getMethod());
  assertEquals("212", errorStack.getLine());
  assertEquals("11", errorStack.getColumn());
  assertEquals("deno:core/core.js", errorStack.getFile());
  assertEquals(true, errorStack.isNative());
});
