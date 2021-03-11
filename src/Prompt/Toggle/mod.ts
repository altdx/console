import { ConsolePromptQuestionType, IConsolePrompt } from "../mod.ts";

export * from "./ConsoleTogglePrompt.ts";

export type ToggleValidatorCallback = ((value: boolean) => boolean | string) | null;

/**
 * Toggle console prompt question type.
 */
export type ConsoleTogglePromptQuestionType = ConsolePromptQuestionType & {
  /**
   * Validator callback.
   */
  validator?: ToggleValidatorCallback;
};

/**
 * Toggle console prompt interface.
 */
export interface IConsoleTogglePrompt extends IConsolePrompt {
  /**
   * Should return true if the value is valid, and an error message String otherwise. If false is returned, a default error message is shown.
   */
  validator(callback: ToggleValidatorCallback): IConsoleTogglePrompt;
}
