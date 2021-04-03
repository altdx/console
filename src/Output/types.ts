import {IConsoleStyle} from "../Style/mod.ts";

/**
 * Altdx Console Output interface.
 * This interface allows you to print some messages in the terminal.
 */
export interface IConsoleOutput {
  /**
   * Write text.
   *
   * @param text - Text to write.
   * @param style - Style to apply.
   */
  write: (text: string, style?: IConsoleStyle) => IConsoleOutput;

  /**
   * Write with new line.
   *
   * @param text - Text to write.
   * @param style - Style to apply.
   */
  writeln: (text: string, style?: IConsoleStyle) => IConsoleOutput;

  /**
   * Write new line.
   *
   * @param count - Number of line.
   */
  newLine: (count?: number) => IConsoleOutput;

  /**
   * Write space.
   *
   * @param count - Number of space.
   */
  space: (count?: number) => IConsoleOutput;

  /**
   * Write success message.
   *
   * @param text - Message to print.
   * @param figure - Add check mark first.
   */
  success: (text: string, figure?: boolean) => IConsoleOutput;

  /**
   * Write error message.
   *
   * @param text - Message to print.
   * @param figure - Add cross mark first.
   */
  error: (text: string, figure: boolean) => IConsoleOutput;

  /**
   * Write info message.
   *
   * @param text - Message to print.
   * @param figure - Add info mark first.
   */
  info: (text: string, figure: boolean) => IConsoleOutput;

  /**
   * Write warning message.
   *
   * @param text - Message to print.
   * @param figure - Add warning mark first.
   */
  warning: (text: string, figure: boolean) => IConsoleOutput;
}
