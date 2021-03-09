import {ConsolePromptQuestionType, IConsolePrompt} from "../mod.ts";

export * from "./ConsoleConfirmPrompt.ts";

/**
 * Confirm console prompt question type.
 */
export type ConsoleConfirmPromptQuestionType = ConsolePromptQuestionType & {

};

/**
 * Confirm console prompt interface.
 */
export interface IConsoleConfirmPrompt extends IConsolePrompt {

}
