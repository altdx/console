import { ConsoleRequestOptionType, IConsoleRequest } from "./types.ts";

/**
 * Altdx Console Request.
 * This class allows you to handle terminal input command.
 *
 * @example
 *
 * ```ts
 *  const request = new ConsoleRequest();
 *
 *  request.parse([]);
 *  request.getCommand(); // help
 *
 *  request.parse(["-v"]);
 *  request.getCommand(); // version
 * ```
 */
export class ConsoleRequest implements IConsoleRequest {
  private command: string | null = null;
  private subCommands: string[] = [];
  private longOptions: ConsoleRequestOptionType = {};
  private shortOptions: ConsoleRequestOptionType = {};
  private consoleArgs: string[] = [];
  private longOptionRegExp = /^--[a-z0-9]{2,}$/i;
  private shortOptionRegExp = /^-[a-z]$/i;

  /**
   * @inheritDoc IConsoleRequest.setCommand
   */
  public setCommand(command: string | null): this {
    if (!command) {
      return this;
    }

    this.subCommands = (command as string).split(":");
    this.command = this.subCommands[0] as string;
    this.subCommands = this.subCommands.slice(1);

    return this;
  }

  /**
   * @inheritDoc IConsoleRequest.getCommand
   */
  public getCommand(): string | null {
    return this.command;
  }

  /**
   * @inheritDoc IConsoleRequest.hasCommand
   */
  public hasCommand(): boolean {
    return null !== this.command;
  }

  /**
   * @inheritDoc IConsoleRequest.getSubCommands
   */
  public getSubCommands(): string[] {
    return this.subCommands;
  }

  /**
   * @inheritDoc IConsoleRequest.hasSubCommands
   */
  public hasSubCommands(): boolean {
    return 0 !== this.subCommands.length;
  }

  /**
   * @inheritDoc IConsoleRequest.addOption
   */
  public addOption(option: string, value: string | boolean): this {
    let optionType: "longOptions" | "shortOptions" = "longOptions";

    if (this.shortOptionRegExp.test(option)) {
      optionType = "shortOptions";
    }

    option = option.replace(/^-+|-+$/g, "");
    let options = this[optionType][option];
    if (options) {
      options.push(value);
    } else {
      options = [value];
    }

    this[optionType][option] = options;

    return this;
  }

  /**
   * @inheritDoc IConsoleRequest.hasShortOption
   */
  public hasShortOption(option?: string): boolean {
    if (option) {
      return Object.prototype.hasOwnProperty.call(this.shortOptions, option);
    }

    return Object.keys(this.shortOptions).length !== 0;
  }

  /**
   * @inheritDoc IConsoleRequest.hasLongOption
   */
  public hasLongOption(option?: string): boolean {
    if (option) {
      return Object.prototype.hasOwnProperty.call(this.longOptions, option);
    }

    return Object.keys(this.longOptions).length !== 0;
  }

  /**
   * @inheritDoc IConsoleRequest.hasOption
   */
  public hasOption(option?: string): boolean {
    return this.hasShortOption(option) && this.hasLongOption(option);
  }

  /**
   * @inheritDoc IConsoleRequest.getShortOptions
   */
  public getShortOptions(): ConsoleRequestOptionType {
    return this.shortOptions;
  }

  /**
   * @inheritDoc IConsoleRequest.getShortOption
   */
  public getShortOption(option: string): (string | boolean)[] | null {
    return this.shortOptions[option] || null;
  }

  /**
   * @inheritDoc IConsoleRequest.getLongOptions
   */
  public getLongOptions(): ConsoleRequestOptionType {
    return this.longOptions;
  }

  /**
   * @inheritDoc IConsoleRequest.getLongOption
   */
  public getLongOption(option: string): (string | boolean)[] | null {
    return this.longOptions[option] || null;
  }

  /**
   * @inheritDoc IConsoleRequest.setArguments
   */
  public setArguments(args: string[]): this {
    this.consoleArgs = args;

    return this;
  }

  /**
   * @inheritDoc IConsoleRequest.getArguments
   */
  public getArguments(): string[] {
    return this.consoleArgs;
  }

  /**
   * @inheritDoc IConsoleRequest.hasArgument
   */
  public hasArgument(): boolean {
    return this.consoleArgs.length !== 0;
  }

  /**
   * @inheritDoc IConsoleRequest.parse
   */
  public parse(args: string[]): this {
    this.resetDefaultValues();

    const consoleArgs: string[] = [];

    for (let i = 0; i < args.length; i += 1) {
      const next: string = args[i + 1];

      if (
        this.longOptionRegExp.test(args[i]) ||
        this.shortOptionRegExp.test(args[i])
      ) {
        if (
          this.longOptionRegExp.test(next) || this.shortOptionRegExp.test(next)
        ) {
          const a: string = args[i];
          this.addOption(a, true);
          continue;
        }

        this.addOption(args[i], next || true);
        i += 1;
        continue;
      }

      consoleArgs.push(args[i]);
    }

    if (consoleArgs[0]) {
      consoleArgs[0] = consoleArgs[0].replace(/^-+|-+$/g, "");
    }

    this.setCommand(consoleArgs[0] || null);
    this.setArguments(consoleArgs.slice(1));

    if (!this.hasCommand()) {
      if (this.hasShortOption("v")) {
        this.setCommand("version");

        return this;
      }

      this.setCommand("help");
      this.addOption("-h", true);

      return this;
    }

    return this;
  }

  /**
   * Reset default values.
   */
  private resetDefaultValues(): void {
    this.command = null;
    this.subCommands = [];
    this.longOptions = {};
    this.shortOptions = {};
    this.consoleArgs = [];
  }
}
