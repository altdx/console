// deno-lint-ignore-file ban-ts-comment
import { IConsoleRequest } from "../Request/mod.ts";
import { IConsoleResponse } from "../Response/mod.ts";
import {
  ConsoleCommandType,
  IConsoleCommand,
  LongOptionType,
  ShortOptionType,
} from "./mod.ts";

/**
 * Altdx Console Command.
 */
export class ConsoleCommand implements IConsoleCommand {
  private errorMessage = "";
  private readonly def: ConsoleCommandType;

  constructor(def: ConsoleCommandType) {
    this.def = def;
  }

  /**
   * @inheritDoc IConsoleCommand.getName
   */
  public getName(): string {
    return this.def.name;
  }

  /**
   * @inheritDoc IConsoleCommand.getDescription
   */
  public getDescription(): string {
    return this.def.description;
  }

  /**
   * @inheritDoc IConsoleCommand.getShortOptions
   */
  public getShortOptions(): ShortOptionType | null {
    return this.def.shortOptions ?? null;
  }

  /**
   * @inheritDoc IConsoleCommand.getLongOptions
   */
  public getLongOptions(): LongOptionType | null {
    return this.def.longOptions ?? null;
  }

  /**
   * @inheritDoc IConsoleCommand.isValid
   */
  public isValid(request: IConsoleRequest): boolean {
    if (this.def.args && this.def.args > 0) {
      if (!request.hasArgument()) {
        this.errorMessage = "Missing argument.";
        return false;
      }

      if (request.getArguments().length < this.def.args) {
        this.errorMessage = `Require ${this.def.args} argument(s).`;
        return false;
      }
    }

    if (this.def.shortOptions) {
      const isValid = this.checkOptions(this.def.shortOptions, request, "ShortOption");
      if (!isValid) {
        return false;
      }
    }

    if (this.def.longOptions) {
      const isValid = this.checkOptions(this.def.longOptions, request, "LongOption");
      if (!isValid) {
        return false;
      }
    }

    return true;
  }

  private checkOptions(options: ShortOptionType | LongOptionType, request: IConsoleRequest, type: "ShortOption" | "LongOption"): boolean {
    const keys: string[] = Object.keys(options);
    for (let i = 0; i < keys.length; i++) {
      const key: string = keys[i];
      const required = options[key].required;
      const constraint = options[key].constraint;
      // @ts-ignore
      const optionValues = request[`get${type}`](key);

      let prefix = "-";
      if (type === "LongOption") {
        prefix = "--";
      }

      // @ts-ignore
      if (required && !request[`has${type}`](key)) {
        this.errorMessage = `Option ${prefix + key} is required.`

        return false;
      }

      if (!required && !optionValues) {
        return true;
      }

      if (constraint && optionValues) {
        for (let k = 0; k < optionValues.length; k++) {
          const optionValue = optionValues[k];
          if (optionValue !== true && optionValue !== false && !constraint.test(optionValue)) {
            this.errorMessage = `Value of ${prefix + key} option does not match.`;
            return false;
          }
        }
      }
    }

    return true;
  }

  /**
   * @inheritDoc IConsoleCommand.getErrorMessage
   */
  public getErrorMessage(): string | null {
    return this.errorMessage;
  }

  /**
   * @inheritDoc IConsoleCommand.run
   */
  public run(
    request: IConsoleRequest,
    response: IConsoleResponse,
  ): IConsoleResponse {
    return this.def.run(request, response);
  }
}
