import {
  ConsoleCommand,
  ConsoleCommandCollection,
  ConsoleCommandType,
} from "../Command/mod.ts";
import { assertEquals, Mock } from "../deps.ts";

import { run } from "./kernel.ts";

const def: ConsoleCommandType = {
  name: "myCommand",
  description: "Description of my command",
  shortOptions: {
    h: {
      description: "Short option",
    },
  },
  longOptions: {
    long: {
      description: "Long option",
      required: true,
    },
  },
  run: (request, response) => response,
};

const collection = new ConsoleCommandCollection();

collection.add(new ConsoleCommand(def));

Deno.test("Altdx CLI Kernel - Should have command", () => {
  const mock = new Mock();
  mock.spyOn(def, "run");
  run(["myCommand", "--long"], collection);
  assertEquals(true, mock.haveBeenCalledTimes(1));
});

Deno.test("Altdx CLI Kernel - Should not have command", () => {
  const mock = new Mock();
  mock.spyOn(def, "run");
  run(["myCommandBad", "--bad"], collection);
  assertEquals(false, mock.haveBeenCalled());
});

Deno.test("Altdx CLI Kernel - Should not have option", () => {
  const mock = new Mock();
  mock.spyOn(def, "run");
  run(["myCommand", "--bad"], collection);
  assertEquals(false, mock.haveBeenCalled());
});
