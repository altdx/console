import { Number } from "../../deps.ts";
import { AbstractConsolePrompt, MessageValueType } from "../mod.ts";
import {ConsoleNumberPromptQuestionType, IConsoleNumberPrompt} from "./mod.ts";

/**
 * Input console prompt.
 *
 * @example
 *  const input = new ConsoleInputPrompt("Your name :");
 *  input.setSuggestions(["One", "Two"]).showHelper();
 *  const v = await input.prompt<string>();
 *  console.log(v);
 */
export class ConsoleNumberPrompt extends AbstractConsolePrompt
  implements IConsoleNumberPrompt {
  /**
   * Question type for input prompt.
   */
  protected question: ConsoleNumberPromptQuestionType;

  /**
   * Constructor.
   *
   * @param message - Message to display when the prompt is rendered in the terminal.
   */
  constructor(message: MessageValueType) {
    super();
    this.question = {
      ...this.getQuestion(),
      type: Number,
      message: message,
      min: null,
      max: null,
      isFloat: false,
      format: 2,
      itemsPerPage: 10,
      helper: false,
      suggestions: null,
    };
  }

  /**
   * @inheritDoc IConsoleNumberPrompt.min
   */
  public min(value: number | null): IConsoleNumberPrompt {
    this.question.min = value;

    return this;
  }

  /**
   * @inheritDoc IConsoleNumberPrompt.max
   */
  public max(value: number | null): IConsoleNumberPrompt {
    this.question.max = value;

    return this;
  }

  /**
   * @inheritDoc IConsoleNumberPrompt.integer
   */
  public integer(): IConsoleNumberPrompt {
    this.question.isFloat = false;

    return this;
  }

  /**
   * @inheritDoc IConsoleNumberPrompt.float
   */
  public float(format: number): IConsoleNumberPrompt {
    this.question.isFloat = true;
    this.question.format = format;

    return this;
  }

  /**
   * @inheritDoc IConsoleNumberPrompt.setSuggestions
   */
  public setSuggestions(
    suggestions: (string | number)[] | null,
  ): IConsoleNumberPrompt {
    this.question.suggestions = suggestions;

    return this;
  }

  /**
   * @inheritDoc IConsoleNumberPrompt.addSuggestion
   */
  public addSuggestion(suggestion: string | number): IConsoleNumberPrompt {
    if (!this.question.suggestions) {
      this.question.suggestions = [];
    }

    this.question.suggestions.push(suggestion);

    return this;
  }

  /**
   * @inheritDoc IConsoleNumberPrompt.getSuggestions
   */
  public getSuggestions(): (string | number)[] | null {
    return this.question.suggestions;
  }

  /**
   * @inheritDoc IConsoleNumberPrompt.getItemsPerPage
   */
  public getItemsPerPage(): number {
    return this.question.itemsPerPage;
  }

  /**
   * @inheritDoc IConsoleNumberPrompt.setItemsPerPage
   */
  public setItemsPerPage(count: number): IConsoleNumberPrompt {
    this.question.itemsPerPage = count;

    return this;
  }

  /**
   * @inheritDoc IConsoleNumberPrompt.hideHelper
   */
  public hideHelper(): IConsoleNumberPrompt {
    this.question.helper = false;

    return this;
  }

  /**
   * @inheritDoc IConsoleNumberPrompt.showHelper
   */
  public showHelper(): IConsoleNumberPrompt {
    this.question.helper = true;

    return this;
  }

  /**
   * @inheritDoc IConsolePrompt.getQuestion
   */
  public getQuestion(): ConsoleNumberPromptQuestionType {
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

      min: this.question.min ?? undefined,
      max: this.question.max ?? undefined,
      float: this.question.isFloat,
      round: this.question.format,

      suggestions: this.question.suggestions ?? undefined,
      list: this.question.suggestions !== null,
      maxRows: this.question.itemsPerPage,
      info: this.question.helper,
    };
  }
}
