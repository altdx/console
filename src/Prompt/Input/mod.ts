import {ConsolePromptQuestionType, IConsolePrompt} from "../mod.ts";

export * from "./ConsoleInputPrompt.ts";

/**
 * Input console prompt question type.
 */
export type ConsoleInputPromptQuestionType = ConsolePromptQuestionType & {
  /**
   * Minimum length. Defaults to null.
   */
  min: number | null;

  /**
   * Maximum length. Defaults to null.
   */
  max: number | null;

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
export interface IConsoleInputPrompt extends IConsolePrompt {
  /**
   * Set minimum length.
   *
   * @param value - Value to set.
   */
  min: (value: number | null) => IConsoleInputPrompt;

  /**
   * Set maximum length.
   *
   * @param value - Value to set.
   */
  max: (value: number | null) => IConsoleInputPrompt;

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
}
