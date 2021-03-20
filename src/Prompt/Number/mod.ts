import { ConsolePromptQuestionType, IConsolePrompt } from "../mod.ts";

export * from "./ConsoleNumberPrompt.ts";

export type NumberValidatorCallback =
  | ((value: number) => boolean | string)
  | null;

/**
 * Input console prompt question type.
 */
export type ConsoleNumberPromptQuestionType = ConsolePromptQuestionType & {
  /**
   * Minimum value. Defaults to null.
   */
  min: number | null;

  /**
   * Maximum value. Defaults to null.
   */
  max: number | null;

  /**
   * Allow floating point or integer inputs. Defaults to false.
   */
  isFloat: boolean;

  /**
   * Round float values to x decimals. Defaults to 2.
   */
  format: number;

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

  /**
   * Validator callback.
   */
  validator?: NumberValidatorCallback;
};

/**
 * Input console prompt interface.
 */
export interface IConsoleNumberPrompt extends IConsolePrompt {
  /**
   * Set minimum value.
   *
   * @param value - Value to set.
   */
  min: (value: number | null) => IConsoleNumberPrompt;

  /**
   * Set maximum value.
   *
   * @param value - Value to set.
   */
  max: (value: number | null) => IConsoleNumberPrompt;

  /**
   * Make input integer.
   */
  integer: () => IConsoleNumberPrompt;

  /**
   * Make input float.
   *
   * @param format - Round value.
   */
  float: (format: number) => IConsoleNumberPrompt;

  /**
   * Set list of auto suggestions.
   *
   * @param suggestions - List of suggestions.
   */
  setSuggestions: (
    suggestions: (string | number)[] | null,
  ) => IConsoleNumberPrompt;

  /**
   * Add auto suggestion value.
   *
   * @param suggestion - Suggestion to add.
   */
  addSuggestion: (suggestion: string | number) => IConsoleNumberPrompt;

  /**
   * Get all suggestions.
   */
  getSuggestions: () => (string | number)[] | null;

  /**
   * Set number of options suggestions per page. Defaults to 10.
   *
   * @param count - Number of items to set.
   */
  setItemsPerPage: (count: number) => IConsoleNumberPrompt;

  /**
   * Get number of options suggestions per page. Defaults to 10.
   */
  getItemsPerPage: () => number;

  /**
   * Show some usage information.
   */
  showHelper: () => IConsoleNumberPrompt;

  /**
   * Hide some usage information.
   */
  hideHelper: () => IConsoleNumberPrompt;

  /**
   * Should return true if the value is valid, and an error message String otherwise. If false is returned, a default error message is shown.
   */
  validator(callback: NumberValidatorCallback): IConsoleNumberPrompt;
}
