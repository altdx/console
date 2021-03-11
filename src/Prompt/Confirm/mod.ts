import { ConsolePromptQuestionType, IConsolePrompt } from "../mod.ts";

export * from "./ConsoleConfirmPrompt.ts";

export type ConfirmValidatorCallback = ((value: boolean) => boolean | string) | null;

/**
 * Confirm console prompt question type.
 */
export type ConsoleConfirmPromptQuestionType = ConsolePromptQuestionType & {
  /**
   * Validator callback.
   */
  validator?: ConfirmValidatorCallback;
};

/**
 * Confirm console prompt interface.
 */
export interface IConsoleConfirmPrompt extends IConsolePrompt {
  /**
   * Should return true if the value is valid, and an error message String otherwise. If false is returned, a default error message is shown.
   */
  validator(callback: ConfirmValidatorCallback): IConsoleConfirmPrompt;
}
