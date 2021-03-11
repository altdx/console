import { IConsoleCommand, IConsoleCommandCollection } from "./mod.ts";

/**
 * Altdx Console Command Collection.
 */
export class ConsoleCommandCollection implements IConsoleCommandCollection {
  private collection: Record<string, IConsoleCommand> = {};

  /**
   * @inheritDoc IConsoleCommandCollection.add
   */
  public add(command: IConsoleCommand): IConsoleCommandCollection {
    this.collection[command.getName()] = command;

    return this;
  }

  /**
   * @inheritDoc IConsoleCommandCollection.get
   */
  public get(command: string): IConsoleCommand | null {
    return this.collection[command] || null;
  }

  /**
   * @inheritDoc IConsoleCommandCollection.getAll
   */
  public getAll(): Record<string, IConsoleCommand> {
    return this.collection;
  }

  /**
   * @inheritDoc IConsoleCommandCollection.filter
   */
  public filter(command: RegExp): Record<string, IConsoleCommand> {
    const filteredCommands: Record<string, IConsoleCommand> = {};
    Object.keys(this.collection).map((name) => {
      if (command.test(name)) {
        filteredCommands[name] = this.collection[name];
      }
    });

    return filteredCommands;
  }

  /**
   * @inheritDoc IConsoleCommandCollection.remove
   */
  public remove(command: string): IConsoleCommandCollection {
    delete this.collection[command];

    return this;
  }

  /**
   * @inheritDoc IConsoleCommandCollection.removeAll
   */
  public removeAll(): IConsoleCommandCollection {
    this.collection = {};

    return this;
  }
}

export const consoleCommandCollection = new ConsoleCommandCollection();
