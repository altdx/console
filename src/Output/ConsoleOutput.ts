import { EOL } from "../deps.ts";
import { consoleFigure } from "../Figure/mod.ts";
import { ConsoleStyle, IConsoleStyle } from "../Style/mod.ts";
import { IConsoleOutput } from "./mod.ts";

/**
 * Hello
 * Altdx Console Output.
 * This class allows you to text on terminal.
 *
 * @example
 *
 * ```ts
 *  import { consoleOutput as output } from '@altdx/console-output';
 *  import { consoleStyle as style } from '@altdx/console-style';
 *
 *  // Simple text
 *  output.write('Hello');
 *
 *  // Text with style
 *  style.bold().color('yellow');
 *  output.write('Hello', style);
 *
 *  // Success message with tick
 *  output.success('Hello');
 *
 *  // Success message without tick
 *  output.success('Hello', false);
 * ```
 */
export class ConsoleOutput implements IConsoleOutput {
  private style = new ConsoleStyle();

  /**
   * @inheritDoc IConsoleOutput.write
   */
  public write(text: string, style?: IConsoleStyle): this {
    const encoder = new TextEncoder();
    Deno.stdout.writeSync(encoder.encode(style ? style.render(text) : text));

    return this;
  }

  /**
   * @inheritDoc IConsoleOutput.writeln
   */
  public writeln(text: string, style?: IConsoleStyle): this {
    return this.write(text + EOL.LF, style);
  }

  /**
   * @inheritDoc IConsoleOutput.newLine
   */
  public newLine(count = 1): this {
    return this.write(EOL.LF.repeat(count));
  }

  /**
   * @inheritDoc IConsoleOutput.space
   */
  public space(count = 1): this {
    return this.write(" ".repeat(count));
  }

  /**
   * @inheritDoc IConsoleOutput.success
   */
  public success(text: string, figure = true): this {
    this.style.reset().color("green");
    this.writeln(
      this.style.render((figure ? consoleFigure.tick() + " " : "") + text),
    );

    return this;
  }

  /**
   * @inheritDoc IConsoleOutput.error
   */
  public error(text: string, figure = true): this {
    this.style.reset().color("red");
    this.writeln(
      this.style.render((figure ? consoleFigure.cross() + " " : "") + text),
    );

    return this;
  }

  /**
   * @inheritDoc IConsoleOutput.info
   */
  public info(text: string, figure = true): this {
    this.style.reset().color("blue");
    this.writeln(
      this.style.render((figure ? consoleFigure.info() + " " : "") + text),
    );

    return this;
  }

  /**
   * @inheritDoc IConsoleOutput.warning
   */
  public warning(text: string, figure = true): this {
    this.style.reset().color("yellow");
    this.writeln(
      this.style.render((figure ? consoleFigure.warning() + " " : "") + text),
    );

    return this;
  }
}

export const consoleOutput = new ConsoleOutput();
