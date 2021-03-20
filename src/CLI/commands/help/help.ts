import { IConsoleResponse } from "../../../Response/mod.ts";
import {
  ConsoleCommand,
  consoleCommandCollection as collection,
} from "../../../Command/mod.ts";
import { printHelp } from "./printHelp.ts";

export const help = (): IConsoleResponse => {
  return printHelp(collection);
};

collection.add(
  new ConsoleCommand({
    name: "help",
    description: "Command line documentation. Print this documentation.",
    shortOptions: {
      h: {
        description: "Short option to run help command",
      },
    },
    run: help,
  }),
);
