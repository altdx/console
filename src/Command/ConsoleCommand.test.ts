import {ConsoleRequest, IConsoleRequest} from "../Request/mod.ts";
import { ConsoleResponse, IConsoleResponse } from "../Response/mod.ts";
import {ConsoleCommand, ConsoleCommandType, LongOptionType, ShortOptionType} from "./mod.ts";
import { assertEquals, Mock } from "../deps.ts";

const run = (request: IConsoleRequest, response: IConsoleResponse) => response;

const def: ConsoleCommandType = {
  name: "create",
  description: "my description",
  run,
};

const command = new ConsoleCommand(def);
const response = new ConsoleResponse();
const request = new ConsoleRequest();

const mock = new Mock();
mock.spyOn(def, "run");

Deno.test("Altdx Console Command - Should get command name", () => {
  assertEquals(def.name, command.getName());
});

Deno.test("Altdx Console Command - Should get command description", () => {
  assertEquals(def.description, command.getDescription());
});

Deno.test("Altdx Console Command - Should get command short options", () => {
  assertEquals(null, command.getShortOptions());
});

Deno.test("Altdx Console Command - Should get command long options", () => {
  assertEquals(null, command.getLongOptions());
});

Deno.test("Altdx Console Command - Should validate arguments", () => {
  request.parse(["command"]);
  let command = new ConsoleCommand({name: "use", description: "", args: 2, run});
  assertEquals(false, command.isValid(request));
  assertEquals("Missing argument.", command.getErrorMessage());
  request.parse(["command", "arg1"]);
  assertEquals(false, command.isValid(request));
  assertEquals("Require 2 argument(s).", command.getErrorMessage());
  command = new ConsoleCommand({name: "use", description: "", args: 2, run});
  request.parse(["command", "arg1", "arg2"]);
  assertEquals(true, command.isValid(request));
  request.parse(["command", "arg1", "arg2", "arg3"]);
  assertEquals(true, command.isValid(request));
});

Deno.test("Altdx Console Command - Should validate short options", () => {
  const shortOptions: ShortOptionType[] = [
    {s:{description: "", required: true}},
    {s:{description: "", required: true, constraint: /hello/}},
  ];

  shortOptions.map((shortOption) => {
    request.parse(["command"]);
    let command = new ConsoleCommand({name: "use", description: "", shortOptions: shortOption, run});
    assertEquals(false, command.isValid(request));
    assertEquals("Option -s is required.", command.getErrorMessage());
    request.parse(["command", "--s"]);
    assertEquals(false, command.isValid(request));
    assertEquals("Option -s is required.", command.getErrorMessage());
    request.parse(["command", "-s", "hello"]);
    assertEquals(true, command.isValid(request));
  });

  const shortOptions2: ShortOptionType = {s:{description: "", constraint: /hello/}};
  request.parse(["command"]);
  let command = new ConsoleCommand({name: "use", description: "", shortOptions: shortOptions2, run});
  assertEquals(true, command.isValid(request));
  request.parse(["command", "-s", "hel"]);
  assertEquals(false, command.isValid(request));
  assertEquals("Value of -s option does not match.", command.getErrorMessage());
  request.parse(["command", "-s", "hel", "-s", "hello world"]);
  assertEquals(false, command.isValid(request));
  assertEquals("Value of -s option does not match.", command.getErrorMessage());
  request.parse(["command", "-s", "john, hello", "-s", "hello world"]);
  assertEquals(true, command.isValid(request));
});

Deno.test("Altdx Console Command - Should validate long options", () => {
  const longOptions: LongOptionType[] = [
    {long:{description: "", required: true}},
    {long:{description: "", required: true, constraint: /hello/}},
  ];

  longOptions.map((longOption) => {
    request.parse(["command"]);
    let command = new ConsoleCommand({name: "use", description: "", longOptions: longOption, run});
    assertEquals(false, command.isValid(request));
    assertEquals("Option --long is required.", command.getErrorMessage());
    request.parse(["command", "---long"]);
    assertEquals(false, command.isValid(request));
    assertEquals("Option --long is required.", command.getErrorMessage());
    request.parse(["command", "--long", "hello"]);
    assertEquals(true, command.isValid(request));
  });

  const shortOptions2: LongOptionType = {long:{description: "", constraint: /hello/}};
  request.parse(["command"]);
  let command = new ConsoleCommand({name: "use", description: "", longOptions: shortOptions2, run});
  assertEquals(true, command.isValid(request));
  request.parse(["command", "--long", "hel"]);
  assertEquals(false, command.isValid(request));
  assertEquals("Value of --long option does not match.", command.getErrorMessage());
  request.parse(["command", "--long", "hel", "--long", "hello world"]);
  assertEquals(false, command.isValid(request));
  assertEquals("Value of --long option does not match.", command.getErrorMessage());
  request.parse(["command", "-long", "john, hello", "-long", "hello world"]);
  assertEquals(true, command.isValid(request));
});

Deno.test("Altdx Console Command - Should run command", () => {
  command.run(request, response);
  assertEquals(true, mock.haveBeenCalledTimes(1));
  assertEquals(true, mock.haveBeenCalledWith(request, response));
});
