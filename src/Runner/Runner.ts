import {Error, IError} from "../Error/mod.ts";
import {EOL} from "../deps.ts";
import {IRunner} from "./mod.ts";

export class Runner implements IRunner {
  protected isError: boolean = false;
  protected status: number = 0;
  protected error: IError | null = null;
  protected output: string | null = null;

  public getStatus(): number {
    return this.status;
  }

  getError(): IError | null {
    return this.error;
  }

  getOutput(): string | null {
    return this.output;
  }

  public hasError(): boolean {
    return this.isError;
  }

  public async run(command: string, ...args: string[]): Promise<void> {
    try {
      const subProcess = Deno.run({
        cmd: [command, ...args],
        stdout: "piped",
        stderr: "piped",
        stdin: "piped",
      });

      const decoder = new TextDecoder();

      // Handle status
      const status = await subProcess.status();
      this.isError = !status.success;
      this.status = status.code;

      // Handle errors
      const stderrOutput = await subProcess.stderrOutput();
      const stderr = decoder.decode(stderrOutput);
      if (stderr) {
        this.error = new Error(stderr);
      }

      // Handle output
      const output = await subProcess.output();
      this.output = decoder.decode(output).replace(new RegExp(EOL.LF + "$", "ig"), "");

      subProcess.close();
    } catch (e){
      this.error = new Error(e.message, e.stack);
    }

    return;
  }
}
