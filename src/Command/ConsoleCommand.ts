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
  public getShortOptions(): ShortOptionType {
    return this.def.shortOptions;
  }

  /**
   * @inheritDoc IConsoleCommand.getLongOptions
   */
  public getLongOptions(): LongOptionType {
    return this.def.longOptions;
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
