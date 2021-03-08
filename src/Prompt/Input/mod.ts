import { ConsolePromptQuestionType } from "../mod.ts";

export * from "./ConsoleInputPrompt.ts";

/**
 * Input console prompt question length type.
 */
export type QuestionLengthType = {
  /**
   * Minimum value. Defaults to 10.
   */
  min: number | null;
  /**
   * Maximum value. Defaults to null.
   */
  max: number | null;
};

/**
 * Input console prompt question type.
 */
export type ConsoleInputPromptQuestionType = ConsolePromptQuestionType & {
  /**
   * Min and max length of value. Defaults to 10 for min and infinity for max.
   */
  length: QuestionLengthType;

  /**
   * A list of auto suggestions.
   */
  suggestions: (string | number)[] | null;

  /**
   * Number of options suggestions per page. Defaults to 10.
   */
  itemsPerPage: number;

  /**
   * Show or hide some usage information. Defaults to false.
   */
  helper: boolean;
};

/**
 * Input console prompt interface.
 */
export interface IConsoleInputPrompt {
  /**
   * Get min and max length of value.
   */
  getLength: () => QuestionLengthType;

  /**
   * Set min and max length of value.
   */
  setLength: (min: number | null, max: number | null) => IConsoleInputPrompt;

  /**
   * Set list of auto suggestions.
   */
  setSuggestions: (
    suggestions: (string | number)[] | null,
  ) => IConsoleInputPrompt;

  /**
   * Add auto suggestion value.
   */
  addSuggestion: (suggestion: string | number) => IConsoleInputPrompt;

  /**
   * Get all suggestions.
   */
  getSuggestions: () => (string | number)[] | null;

  /**
   * Set number of options suggestions per page. Defaults to 10.
   */
  setItemsPerPage: (count: number) => IConsoleInputPrompt;

  /**
   * Get number of options suggestions per page. Defaults to 10.
   */
  getItemsPerPage: () => number;

  /**
   * Show some usage information.
   */
  showHelper: () => IConsoleInputPrompt;

  /**
   * Hide some usage information.
   */
  hideHelper: () => IConsoleInputPrompt;

  /**
   * Get parse question. Can be used to transform question for another module.
   */
  getParseQuestion: () => unknown;
}
