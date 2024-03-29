import { AbstractConsolePrompt, MessageValueType } from "../mod.ts";
import {
  ConsoleInputPromptQuestionType,
  IConsoleInputPrompt,
  InputValidatorCallback,
} from "./types.ts";
import { Input } from "../../deps.ts";

/**
 * Input console prompt.
 *
 * @example
 *  const input = new ConsoleInputPrompt("Your name :");
 *  input.setSuggestions(["One", "Two"]).showHelper();
 *  const v = await input.prompt<string>();
 *  console.log(v);
 */
export class ConsoleInputPrompt extends AbstractConsolePrompt
  implements IConsoleInputPrompt {
  /**
   * Question type for input prompt.
   */
  protected question: ConsoleInputPromptQuestionType;

  /**
   * Constructor.
   *
   * @param message - Message to display when the prompt is rendered in the terminal.
   */
  constructor(message: MessageValueType) {
    super();
    this.question = {
      type: Input,
      name: "answer",
      message: message,
      validator: null,
      min: null,
      max: null,
      itemsPerPage: 10,
      helper: false,
      suggestions: null,
    };
  }

  /**
   * @inheritDoc IConsoleInputPrompt.min
   */
  public min(value: number | null): IConsoleInputPrompt {
    this.question.min = value;

    return this;
  }

  /**
   * @inheritDoc IConsoleInputPrompt.max
   */
  public max(value: number | null): IConsoleInputPrompt {
    this.question.max = value;

    return this;
  }

  /**
   * @inheritDoc IConsoleInputPrompt.setSuggestions
   */
  public setSuggestions(
    suggestions: (string | number)[] | null,
  ): IConsoleInputPrompt {
    this.question.suggestions = suggestions;

    return this;
  }

  /**
   * @inheritDoc IConsoleInputPrompt.addSuggestion
   */
  public addSuggestion(suggestion: string | number): IConsoleInputPrompt {
    if (!this.question.suggestions) {
      this.question.suggestions = [];
    }

    this.question.suggestions.push(suggestion);

    return this;
  }

  /**
   * @inheritDoc IConsoleInputPrompt.getSuggestions
   */
  public getSuggestions(): (string | number)[] | null {
    return this.question.suggestions;
  }

  /**
   * @inheritDoc IConsoleInputPrompt.getItemsPerPage
   */
  public getItemsPerPage(): number {
    return this.question.itemsPerPage;
  }

  /**
   * @inheritDoc IConsoleInputPrompt.setItemsPerPage
   */
  public setItemsPerPage(count: number): IConsoleInputPrompt {
    this.question.itemsPerPage = count;

    return this;
  }

  /**
   * @inheritDoc IConsoleInputPrompt.hideHelper
   */
  public hideHelper(): IConsoleInputPrompt {
    this.question.helper = false;

    return this;
  }

  /**
   * @inheritDoc IConsoleInputPrompt.showHelper
   */
  public showHelper(): IConsoleInputPrompt {
    this.question.helper = true;

    return this;
  }

  /**
   * @inheritDoc IConsoleInputPrompt.validator
   */
  validator(callback: InputValidatorCallback): IConsoleInputPrompt {
    this.question.validator = callback;

    return this;
  }

  /**
   * @inheritDoc IConsolePrompt.getQuestion
   */
  public getQuestion(): ConsoleInputPromptQuestionType {
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
      minLength: this.question.min ?? undefined,
      maxLength: this.question.max ?? undefined,
      suggestions: this.question.suggestions ?? undefined,
      list: this.question.itemsPerPage !== 0,
      maxRows: this.question.itemsPerPage,
      info: this.question.helper,
    };
  }
}
