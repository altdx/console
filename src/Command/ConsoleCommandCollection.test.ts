import { IConsoleResponse } from "../Response/mod.ts";
import {
  ConsoleCommand,
  ConsoleCommandCollection,
  consoleCommandCollection as collection,
} from "./mod.ts";
import { assertEquals, assertNotEquals } from "../deps.ts";

const expectedCommands = ["create", "remove", "clean", "toRemove"];

expectedCommands.map((name) => {
  collection.add(
    new ConsoleCommand({
      name,
      description: "my description",
      shortOptions: {},
      longOptions: {},
      run: (request, response): IConsoleResponse => {
        return response;
      },
    }),
  );
});

Deno.test("Altdx Console Command Collection - Should get all commands", () => {
  const commands = collection.getAll();
  assertEquals(expectedCommands, Object.keys(commands));
});

Deno.test("Altdx Console Command Collection - Should filter commands", () => {
  const commands = collection.filter(/ea/);
  assertEquals(["create", "clean"], Object.keys(commands));
  assertEquals("create", commands.create.getName());
});

Deno.test("Altdx Console Command Collection - Should add command", () => {
  const createCommand = collection.get("create");
  if (createCommand) {
    assertEquals(
      true,
      collection.add(createCommand) instanceof ConsoleCommandCollection,
    );
    assertEquals(null, collection.get("createNotFound"));
    assertEquals(true, collection.get("create") instanceof ConsoleCommand);
  }
});

Deno.test("Altdx Console Command Collection - Should remove command", () => {
  assertNotEquals(null, collection.get("toRemove"));
  assertEquals(
    true,
    collection.remove("toRemove") instanceof ConsoleCommandCollection,
  );
  assertEquals(null, collection.get("toRemove"));
});
