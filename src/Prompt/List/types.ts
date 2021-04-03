import {ConsolePromptQuestionType, IConsolePrompt} from "../types.ts";

export type ListValidatorCallback =
  | ((value: string[]) => boolean | string)
  | null;

/**
 * List console prompt question type.
 */
export type ConsoleListPromptQuestionType = ConsolePromptQuestionType & {
  /**
   * Minimum length of a single tag. Defaults to null.
   */
  min: number | null;

  /**
   * Minimum number of tags. Defaults to null.
   */
  minTags: number | null;

  /**
   * Maximum length of a single tag. Defaults to null.
   */
  max: number | null;

  /**
   * Maximum number of tags. Defaults to null.
   */
  maxTags: number | null;

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
   * String separator. Defaults to ','.
   */
  separator: string | null;

  /**
   * Validator callback.
   */
  validator?: ListValidatorCallback;
};

/**
 * List console prompt interface.
 */
export interface IConsoleListPrompt extends IConsolePrompt {
  /**
   * Set minimum length of a single tag.
   *
   * @param value - Value to set.
   */
  min: (value: number | null) => IConsoleListPrompt;

  /**
   * Set minimum number of tags.
   *
   * @param value - Value to set.
   */
  minTags: (value: number | null) => IConsoleListPrompt;

  /**
   * Set maximum length of a single tag.
   *
   * @param value - Value to set.
   */
  max: (value: number | null) => IConsoleListPrompt;

  /**
   * Set maximum number of tags.
   *
   * @param value - Value to set.
   */
  maxTags: (value: number | null) => IConsoleListPrompt;

  /**
   * Set list of auto suggestions.
   */
  setSuggestions: (
    suggestions: (string | number)[] | null,
  ) => IConsoleListPrompt;

  /**
   * Add auto suggestion value.
   */
  addSuggestion: (suggestion: string | number) => IConsoleListPrompt;

  /**
   * Get all suggestions.
   */
  getSuggestions: () => (string | number)[] | null;

  /**
   * Set number of options suggestions per page. Defaults to 10.
   */
  setItemsPerPage: (count: number) => IConsoleListPrompt;

  /**
   * Get number of options suggestions per page. Defaults to 10.
   */
  getItemsPerPage: () => number;

  /**
   * Show some usage information.
   */
  showHelper: () => IConsoleListPrompt;

  /**
   * Hide some usage information.
   */
  hideHelper: () => IConsoleListPrompt;

  /**
   * Set string separator.
   */
  setSeparator: (sep: string | null) => IConsoleListPrompt;

  /**
   * Get string separator.
   */
  getSeparator: () => string | null;

  /**
   * Should return true if the value is valid, and an error message String otherwise. If false is returned, a default error message is shown.
   */
  validator(callback: ListValidatorCallback): IConsoleListPrompt;
}
