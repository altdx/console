import { Confirm } from "../../deps.ts";
import { AbstractConsolePrompt, MessageValueType } from "../mod.ts";
import {
  ConsoleConfirmPromptQuestionType,
  IConsoleConfirmPrompt,
} from "./mod.ts";

/**
 * Confirm console prompt.
 */
export class ConsoleConfirmPrompt extends AbstractConsolePrompt
  implements IConsoleConfirmPrompt {
  /**
   * Question type for input prompt.
   */
  protected question: ConsoleConfirmPromptQuestionType;

  /**
   * Constructor.
   *
   * @param message - Message to display when the prompt is rendered in the terminal.
   */
  constructor(message: MessageValueType) {
    super();
    this.question = {
      ...this.getQuestion(),
      type: Confirm,
      message: message,
    };
  }

  /**
   * @inheritDoc IConsolePrompt.getQuestion
   */
  public getQuestion(): ConsoleConfirmPromptQuestionType {
    return this.question;
  }

  /**
   * @inheritDoc IConsolePrompt.getParseQuestion
   */
  public getParseQuestion(): unknown {
    return {
      name: this.question.name,
      type: this.question.type,
      message: this.question.message ?? "",
    };
  }
}
