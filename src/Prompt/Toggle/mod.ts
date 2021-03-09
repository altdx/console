// deno-lint-ignore-file
import { ConsolePromptQuestionType, IConsolePrompt } from "../mod.ts";

export * from "./ConsoleTogglePrompt.ts";

/**
 * Toggle console prompt question type.
 */
export type ConsoleTogglePromptQuestionType = ConsolePromptQuestionType & {};

/**
 * Toggle console prompt interface.
 */
export interface IConsoleTogglePrompt extends IConsolePrompt {
}
