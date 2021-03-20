import {IErrorStack} from "./mod.ts";

export class ErrorStack implements IErrorStack {
  private readonly method: string | null = null;
  private readonly file: string | null = null;
  private line: string | null = null;
  private column: string | null = null;
  private native: boolean = true;

  constructor(stack: string) {
    const stacks = stack.split(" ");
    let file = "";
    if (stacks.length === 3) {
      this.method = stacks[1];
      file = stacks[2];
    }

    if (stacks.length === 2) {
      file = stacks[1];
    }

    file = file.replace(/:(\d+):(\d+)/, (match, line, column) => {
      this.line = line;
      this.column = column;

      return "";
    })
      .replace(/^\(|\)$/g, "")
      .replace(Deno.cwd(), () => {
        this.native = false;

        return "";
      });

    this.file = file;
  }

  public getColumn(): string | null {
    return this.column;
  }

  public getFile(): string | null {
    return this.file;
  }

  public getLine(): string | null {
    return this.line;
  }

  public getMethod(): string | null {
    return this.method;
  }

  isNative(): boolean {
    return this.native;
  }
}
