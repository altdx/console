export * from "./ConsoleRequest.ts";

/**
 * Console request option type.
 */
export type ConsoleRequestOptionType = Record<string, (string | boolean)[]>;

/**
 * Console request interface.
 */
export interface IConsoleRequest {
  /**
   * Get command.
   */
  getCommand: () => string | null;

  /**
   * Set command.
   */
  setCommand: (command: string | null) => IConsoleRequest;

  /**
   * Check if this request has a command.
   */
  hasCommand: () => boolean;

  /**
   * Get sub commands.
   */
  getSubCommands: () => string[];

  /**
   * Check if this request has a sub commands.
   */
  hasSubCommands: () => boolean;

  /**
   * Add long or short option.
   *
   * @param option - Short or long option.
   * @param value - Value of short or long option.
   */
  addOption: (option: string, value: string | boolean) => IConsoleRequest;

  /**
   * Check if this request has a given option.
   *
   * @param option - Name of option. Omit argument to check if short option is defined.
   */
  hasShortOption: (option?: string) => boolean;

  /**
   * Check if this request has a given option.
   *
   * @param option - Name of option. Omit argument to check if long option is defined.
   */
  hasLongOption: (option?: string) => boolean;

  /**
   * Check if this request has a given option.
   *
   * @param option - Name of option. Omit argument to check if short option is defined.
   */
  hasOption: (option?: string) => boolean;

  /**
   * Get all short options.
   */
  getShortOptions: () => ConsoleRequestOptionType;

  /**
   * Get short option.
   *
   * @param option - Name of short option.
   */
  getShortOption: (option: string) => (string | boolean)[] | null;

  /**
   * Get all long options.
   */
  getLongOptions: () => ConsoleRequestOptionType;

  /**
   * Get short option.
   *
   * @param option - Name of long option.
   */
  getLongOption: (option: string) => (string | boolean)[] | null;

  /**
   * Set arguments.
   */
  setArguments: (args: string[]) => IConsoleRequest;

  /**
   * Get arguments.
   */
  getArguments: () => string[];

  /**
   * Check if this request has arguments.
   */
  hasArgument: () => boolean;

  /**
   * Parses arguments.
   */
  parse: (args: string[]) => IConsoleRequest;
}
