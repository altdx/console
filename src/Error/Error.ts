import {ErrorStack} from "./ErrorStack.ts";
import {IError, IErrorStack} from "./mod.ts";
import { EOL } from "../deps.ts";

export class Error implements IError {
  private readonly message: string;
  private readonly stacks: IErrorStack[] | null = null;

  constructor(message: string, stack?: string) {
    this.message = message.replace(new RegExp(EOL.LF + "$", "ig"), "");
    if (stack) {
      this.stacks = this.parseStack(stack);
    }
  }

  public getMessage(): string {
    return this.message;
  }

  public getStacks(): IErrorStack[] | null {
    return this.stacks;
  }

  public display(): IError {
    // Todo:

    return this;
  }

  private parseStack(stack: string): IErrorStack[] {
    const stacks: IErrorStack[] = [];
    stack.split(EOL.LF).map((st) => {
      const errorStack = new ErrorStack(st);

      stacks.push(errorStack)
    });

    return stacks;
  }
}
