export * from "./ConsolePrompt.ts";
export * from "./AbstractConsolePrompt.ts";

import { Input, Number, Secret, Confirm } from "../deps.ts";

/**
 * Type value type.
 */
export type TypeValueType = typeof Input | typeof Number | typeof Secret | typeof Confirm;

/**
 * Name value type.
 */
export type NameValueType = string;

/**
 * Message value type.
 */
export type MessageValueType = string | undefined;

/**
 * Console prompt question type.
 */
export type ConsolePromptQuestionType = {
  /**
   * Value to determine the type of prompt to run.
   *
   * @default Input
   */
  type: TypeValueType;

  /**
   * Used as the key for the answer on the returned values (answers) object.
   */
  name: NameValueType;

  /**
   * The message to display when the prompt is rendered in the terminal.
   *
   * @default ''
   */
  message?: MessageValueType;
};

/**
 * Console prompt interface.
 */
export interface IConsolePrompt {
  /**
   * Get type of prompt.
   */
  getType: () => TypeValueType;

  /**
   * Set type of prompt.
   *
   * @param type - Type of prompt.
   */
  setType: (type: TypeValueType) => IConsolePrompt;

  /**
   * Get key for answer.
   * Used as the key for the answer on the returned values (answers) object.
   */
  getName: () => NameValueType;

  /**
   * Set key for answer.
   *
   * @param name - Used as the key for the answer on the returned values (answers) object.
   */
  setName: (name: NameValueType) => IConsolePrompt;

  /**
   * Get message to display when the prompt is rendered in the terminal.
   */
  getMessage: () => MessageValueType;

  /**
   * Set message to display when the prompt is rendered in the terminal.
   *
   * @param message - Message to display.
   */
  setMessage: (message: MessageValueType) => IConsolePrompt;

  /**
   * Get question object.
   */
  getQuestion: () => ConsolePromptQuestionType;

  /**
   * Get parse question. Can be used to transform question for another module.
   */
  getParseQuestion: () => unknown;

  /**
   * Prompt question.
   */
  prompt<T>(): Promise<T>;
}
