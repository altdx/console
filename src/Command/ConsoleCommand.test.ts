import { ConsoleRequest } from "../Request/mod.ts";
import { ConsoleResponse, IConsoleResponse } from "../Response/mod.ts";
import { ConsoleCommand, ConsoleCommandType } from "./mod.ts";
import { assertEquals, Mock } from "../deps.ts";

const def: ConsoleCommandType = {
  name: "create",
  description: "my description",
  shortOptions: {},
  longOptions: {},
  run: (request, response): IConsoleResponse => {
    return response;
  },
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
  assertEquals(def.shortOptions, command.getShortOptions());
});

Deno.test("Altdx Console Command - Should get command long options", () => {
  assertEquals(def.longOptions, command.getLongOptions());
});

Deno.test("Altdx Console Command - Should run command", () => {
  command.run(request, response);
  assertEquals(true, mock.haveBeenCalledTimes(1));
  assertEquals(true, mock.haveBeenCalledWith(request, response));
});
