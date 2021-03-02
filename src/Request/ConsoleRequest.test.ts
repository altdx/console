import { assertEquals } from "../deps.ts";
import { consoleRequest as request } from "./mod.ts";

Deno.test("Altdx Console Request - should have default values", () => {
  request.parse(["-v"]);
  assertEquals("version", request.getCommand());
  assertEquals(true, request.hasCommand());
  assertEquals(true, request.hasShortOption("v"));

  request.parse([]);
  assertEquals("help", request.getCommand());
  assertEquals(true, request.hasCommand());
  assertEquals(true, request.hasShortOption("h"));
});

Deno.test("Altdx Console Request - should have command", () => {
  request.parse(["command", "sync"]);

  assertEquals("command", request.getCommand());
  assertEquals(true, request.hasCommand());

  request.parse([]);
  assertEquals("help", request.getCommand());
  assertEquals(true, request.hasCommand());
});

Deno.test("Altdx Console Request - should have sub command", () => {
  request.parse(["command:sub1:sub2"]);

  assertEquals(["sub1", "sub2"], request.getSubCommands());
  assertEquals(true, request.hasSubCommands());
});

Deno.test("Altdx Console Request - should have short or long option", () => {
  request.parse(["command", "-s", "--long"]);

  assertEquals(
    true,
    request.hasShortOption() &&
      request.hasShortOption("s") &&
      request.hasLongOption() &&
      request.hasLongOption("long") &&
      request.hasOption(),
  );
});

Deno.test("Altdx Console Request - should not have short or long option", () => {
  request.parse(["command", "-short", "--l"]);

  assertEquals(
    false,
    request.hasShortOption() &&
      request.hasShortOption("short") &&
      request.hasLongOption() &&
      request.hasLongOption("l") &&
      request.hasOption(),
  );
});

Deno.test("Altdx Console Request - should get short or long option", () => {
  request.parse(["command", "-s", "hello short", "--long", "hello long"]);

  assertEquals({ s: ["hello short"] }, request.getShortOptions());
  assertEquals({ long: ["hello long"] }, request.getLongOptions());

  request.parse([
    "command",
    "-s",
    "--long",
    "hello long 1",
    "-s",
    "hello short 2",
    "--long",
    "hello long 2",
  ]);

  assertEquals({ s: [true, "hello short 2"] }, request.getShortOptions());

  assertEquals(
    { long: ["hello long 1", "hello long 2"] },
    request.getLongOptions(),
  );

  assertEquals([true, "hello short 2"], request.getShortOption("s"));
  assertEquals(null, request.getShortOption("a"));

  assertEquals(["hello long 1", "hello long 2"], request.getLongOption("long"));
  assertEquals(null, request.getLongOption("falseLong"));
});

Deno.test("Altdx Console Request - should have arguments", () => {
  request.parse(["command", "arg1", "arg2"]);

  assertEquals(["arg1", "arg2"], request.getArguments());
  assertEquals(true, request.hasArgument());

  request.parse(["command"]);
  assertEquals(false, request.hasArgument());
});
