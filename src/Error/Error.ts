import { ErrorStack } from "./ErrorStack.ts";
import { IError, IErrorStack } from "./types.ts";
import { ConsoleFigure, ConsoleOutput, ConsoleStyle, EOL } from "./deps.ts";

/**
 * Altdx Error.
 * This class allows you to handle error.
 */
export class Error implements IError {
  private readonly message: string;
  private readonly status: number;
  private readonly stacks: IErrorStack[] | null = null;
  private output = new ConsoleOutput();
  private style = new ConsoleStyle();
  private figure = new ConsoleFigure();

  constructor(message: string, status: number, stack?: string) {
    this.message = message.replace(new RegExp(EOL.LF + "$", "ig"), "");
    this.status = status;
    if (stack) {
      this.stacks = this.parseStack(stack);
    }
  }

  /**
   * @inheritDoc IError.getMessage
   */
  public getMessage(): string {
    return this.message;
  }

  /**
   * @inheritDoc IError.getStatus
   */
  public getStatus(): number {
    return this.status;
  }

  /**
   * @inheritDoc IError.getStacks
   */
  public getStacks(): IErrorStack[] | null {
    return this.stacks;
  }

  /**
   * @inheritDoc IError.verbose
   */
  public verbose(): IError {
    const style = this.style.reset();
    const figure = this.figure;
    const output = this.output;

    if (this.status !== 0) {
      style.color("red");
      output.newLine().write(`${figure.cross()} [adx:${this.status}]`, style);
    }

    if (this.message) {
      output.writeln(` ${this.message}`).newLine();
    }

    if (!this.stacks || this.stacks.length === 0) {
      return this;
    }

    style.reset();

    this.stacks.map((stack, index) => {
      if (stack.isNative()) {
        style.color("gray");
      } else {
        style.color("white");
      }

      let fig = figure.arrowUp();

      if (index === 0) {
        fig = figure.squareFilled();
      }

      if (this.stacks && index === (this.stacks.length - 1)) {
        fig = figure.circleFilled();
      }

      output.space(2);

      const method = stack.getMethod();

      const message = " " + (method ? "[" + method + "] " : "") +
        stack.getFile() +
        ":" + stack.getLine() + ":" + stack.getColumn();

      output.writeln(`${fig} ${message}`, style);
    });

    return this;
  }

  private parseStack(stack: string): IErrorStack[] {
    const stacks: IErrorStack[] = [];
    stack.split(EOL.LF).map((st) => {
      const errorStack = new ErrorStack(st);
      if (
        errorStack.getMethod() || errorStack.getFile() ||
        errorStack.getLine() || errorStack.getColumn()
      ) {
        stacks.push(errorStack);
      }
    });

    return stacks;
  }
}
