import { ConsolePromptQuestionType, IConsolePrompt } from "../mod.ts";

export * from "./ConsoleSecretPrompt.ts";

export type SecretValidatorCallback =
  | ((value: string) => boolean | string)
  | null;

/**
 * Input console prompt question type.
 */
export type ConsoleSecretPromptQuestionType = ConsolePromptQuestionType & {
  /**
   * Minimum length. Defaults to null.
   */
  min: number | null;

  /**
   * Maximum length. Defaults to null.
   */
  max: number | null;

  /**
   * Show input during typing.
   */
  show: boolean;

  /**
   * Validator callback.
   */
  validator?: SecretValidatorCallback;
};

/**
 * Input console prompt interface.
 */
export interface IConsoleSecretPrompt extends IConsolePrompt {
  /**
   * Set minimum length.
   *
   * @param value - Value to set.
   */
  min: (value: number | null) => IConsoleSecretPrompt;

  /**
   * Set maximum length.
   *
   * @param value - Value to set.
   */
  max: (value: number | null) => IConsoleSecretPrompt;

  /**
   * Show input during typing.
   */
  show: () => IConsoleSecretPrompt;

  /**
   * Hide input during typing.
   */
  hide: () => IConsoleSecretPrompt;

  /**
   * Should return true if the value is valid, and an error message String otherwise. If false is returned, a default error message is shown.
   */
  validator(callback: SecretValidatorCallback): IConsoleSecretPrompt;
}
