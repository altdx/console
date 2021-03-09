import { Secret } from "../../deps.ts";
import { AbstractConsolePrompt, MessageValueType } from "../mod.ts";
import {
  ConsoleSecretPromptQuestionType,
  IConsoleSecretPrompt,
} from "./mod.ts";

/**
 * Secret console prompt.
 */
export class ConsoleSecretPrompt extends AbstractConsolePrompt
  implements IConsoleSecretPrompt {
  /**
   * Question type for input prompt.
   */
  protected question: ConsoleSecretPromptQuestionType;

  /**
   * Constructor.
   *
   * @param message - Message to display when the prompt is rendered in the terminal.
   */
  constructor(message: MessageValueType) {
    super();
    this.question = {
      ...this.getQuestion(),
      type: Secret,
      message: message,
      min: null,
      max: null,
      show: true,
    };
  }

  /**
   * @inheritDoc IConsoleSecretPrompt.min
   */
  public min(value: number | null): IConsoleSecretPrompt {
    this.question.min = value;

    return this;
  }

  /**
   * @inheritDoc IConsoleSecretPrompt.max
   */
  public max(value: number | null): IConsoleSecretPrompt {
    this.question.max = value;

    return this;
  }

  /**
   * @inheritDoc IConsoleSecretPrompt.hide
   */
  public hide(): IConsoleSecretPrompt {
    this.question.show = false;

    return this;
  }

  /**
   * @inheritDoc IConsoleSecretPrompt.show
   */
  public show(): IConsoleSecretPrompt {
    this.question.show = true;

    return this;
  }

  /**
   * @inheritDoc IConsolePrompt.getQuestion
   */
  public getQuestion(): ConsoleSecretPromptQuestionType {
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
      minLength: this.question.min ?? undefined,
      maxLength: this.question.max ?? undefined,
      hidden: !this.question.show,
    };
  }
}
