import { Toggle } from "../../deps.ts";
import { AbstractConsolePrompt, MessageValueType } from "../mod.ts";
import {
  ConsoleTogglePromptQuestionType,
  IConsoleTogglePrompt,
  ToggleValidatorCallback,
} from "./mod.ts";

/**
 * Toggle console prompt.
 */
export class ConsoleTogglePrompt extends AbstractConsolePrompt
  implements IConsoleTogglePrompt {
  /**
   * Question type for input prompt.
   */
  protected question: ConsoleTogglePromptQuestionType;

  /**
   * Constructor.
   *
   * @param message - Message to display when the prompt is rendered in the terminal.
   */
  constructor(message: MessageValueType) {
    super();
    this.question = {
      ...this.getQuestion(),
      type: Toggle,
      message: message,
      validator: null,
    };
  }

  /**
   * @inheritDoc IConsoleTogglePrompt.validator
   */
  validator(callback: ToggleValidatorCallback): IConsoleTogglePrompt {
    this.question.validator = callback;

    return this;
  }

  /**
   * @inheritDoc IConsolePrompt.getQuestion
   */
  public getQuestion(): ConsoleTogglePromptQuestionType {
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
      validate: this.question.validator ?? undefined,
    };
  }
}
