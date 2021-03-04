import { IConsoleRequest } from "../Request/mod.ts";
import { IConsoleResponse } from "../Response/mod.ts";

type PartialRecord<K extends string, T> = { [P in K]?: T };

export * from "./ConsoleCommand.ts";
export * from "./ConsoleCommandCollection.ts";

export type LetterType =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

export type ShortOptionType = PartialRecord<
  LetterType,
  ConsoleCommandOptionType
>;
export type LongOptionType = Record<string, ConsoleCommandOptionType>;

/**
 * Altdx Console Command option type.
 */
export type ConsoleCommandOptionType = {
  /**
   * Option description.
   */
  description: string;
  /**
   * Option constraint.
   */
  constraint?: RegExp;
  /**
   * Error message for not valid option.
   */
  errorMessage?: string;
  /**
   * Option is required or not.
   */
  required?: boolean;
};

/**
 * Altdx Console Command type.
 */
export type ConsoleCommandType = {
  /**
   * Command to execute.
   */
  name: string;

  /**
   * Description of command.
   */
  description: string;

  /**
   * Available short options for this command.
   */
  shortOptions: ShortOptionType;

  /**
   * Available long options for this command.
   */
  longOptions: LongOptionType;

  /**
   * Function to run if command match.
   *
   * @param request - Inject request object build from user input.
   * @param response - Inject response object.
   */
  run: (
    request: IConsoleRequest,
    response: IConsoleResponse,
  ) => IConsoleResponse;
};

/**
 * Altdx Console Command interface.
 */
export interface IConsoleCommand {
  /**
   * Gets name of command.
   */
  getName: () => string;

  /**
   * Gets command description.
   */
  getDescription: () => string;

  /**
   * Gets command short options.
   */
  getShortOptions: () => ShortOptionType;

  /**
   * Gets command long options.
   */
  getLongOptions: () => LongOptionType;

  /**
   * @inheritDoc ConsoleCommandType.run
   */
  run: (
    request: IConsoleRequest,
    response: IConsoleResponse,
  ) => IConsoleResponse;
}

/**
 * Altdx Console Command Collection interface.
 */
export interface IConsoleCommandCollection {
  /**
   * Gets command from collection.
   *
   * @param command - Name of command.
   */
  get: (command: string) => IConsoleCommand | null;

  /**
   * Gets all command from collection.
   */
  getAll: () => Record<string, IConsoleCommand>;

  /**
   * Filters commands by name from collection.
   *
   * @param command - Command schema.
   */
  filter: (command: RegExp) => Record<string, IConsoleCommand>;

  /**
   * Add command to collection.
   *
   * @param command - Command to add.
   */
  add: (command: IConsoleCommand) => IConsoleCommandCollection;

  /**
   * Remove command from collection.
   *
   * @param command - Name of command.
   */
  remove: (command: string) => IConsoleCommandCollection;
}
