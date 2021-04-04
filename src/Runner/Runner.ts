import { IRunner } from "./types.ts";
import { ConsoleOutput, EOL, Error, IError } from "./deps.ts";

/**
 * Altdx Runner.
 * This class allows you to run command.
 *
 * @example
 *
 * ```ts
 * const runner = new Runner();
 *
 * await runner.run("echo", "hello");
 * runner.verbose();
 * Deno.exit(runner.getStatus());
 * ```
 */
export class Runner implements IRunner {
  protected isError = false;
  protected status = 0;
  protected error: IError | null = null;
  protected output: string | null = null;
  private consoleOutput = new ConsoleOutput();

  /**
   * @inheritDoc IRunner.verbose
   */
  public verbose(): IRunner {
    if (this.error) {
      this.error.verbose();

      return this;
    }

    if (this.output) {
      this.consoleOutput.writeln(this.output);
    }

    return this;
  }

  /**
   * @inheritDoc IRunner.getStatus
   */
  public getStatus(): number {
    return this.status;
  }

  /**
   * @inheritDoc IRunner.getError
   */
  getError(): IError | null {
    return this.error;
  }

  /**
   * @inheritDoc IRunner.getOutput
   */
  getOutput(): string | null {
    return this.output;
  }

  /**
   * @inheritDoc IRunner.hasError
   */
  public hasError(): boolean {
    return this.isError;
  }

  /**
   * @inheritDoc IRunner.run
   */
  public async run(command: string, ...args: string[]): Promise<void> {
    let code = 0;

    try {
      code = 127;
      const subProcess = Deno.run({
        cmd: [command, ...args],
        stdout: "piped",
        stderr: "piped",
        stdin: "piped",
      });

      const decoder = new TextDecoder();

      // Handle status
      code = 0;
      const status = await subProcess.status();
      this.isError = !status.success;
      this.status = status.code;

      // Handle errors
      code = 0;
      const stderrOutput = await subProcess.stderrOutput();
      const stderr = decoder.decode(stderrOutput);
      if (stderr) {
        this.error = new Error(stderr, this.status);
      }

      // Handle output
      code = 0;
      const output = await subProcess.output();
      this.output = decoder.decode(output).replace(
        new RegExp(EOL.LF + "$", "ig"),
        "",
      );

      subProcess.close();
    } catch (e) {
      if (code === 127) {
        this.status = 127;
        e.message = `Command '${command}' not found.`;
      }

      this.error = new Error(e.message, this.status, e.stack);
    }

    return;
  }
}
