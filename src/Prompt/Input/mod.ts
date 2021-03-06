import { ConsolePromptQuestionType } from "../mod.ts";

export * from "./ConsoleInputPrompt.ts";

/**
 * Input console prompt question type.
 */
export type ConsoleInputPromptQuestionType = ConsolePromptQuestionType & {
  /**
   * Min length of value. Defaults to 0.
   */
  minLength?: number;

  /**
   * Max length of value. Defaults to infinity.
   */
  maxLength?: number | null;

  /**
   * A list of auto suggestions.
   */
  suggestions?: (string|number)[];
  /**
   * Show auto suggestions list.
   */
  list?: boolean;

  /**
   * Show some usage information.
   */
  info?: boolean;

  /**
   * Number of options suggestions per page. Defaults to 10.
   */
  maxRows: number;
  listPointer: string;
};


/**
 * Input console prompt interface.
 */
export interface IConsoleInputPrompt {

}
