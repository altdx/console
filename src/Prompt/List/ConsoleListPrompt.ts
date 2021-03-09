import { List } from "../../deps.ts";
import { AbstractConsolePrompt, MessageValueType } from "../mod.ts";
import { ConsoleListPromptQuestionType, IConsoleListPrompt } from "./mod.ts";

/**
 * List console prompt.
 */
export class ConsoleListPrompt extends AbstractConsolePrompt
  implements IConsoleListPrompt {
  /**
   * Question type for input prompt.
   */
  protected question: ConsoleListPromptQuestionType;

  /**
   * Constructor.
   *
   * @param message - Message to display when the prompt is rendered in the terminal.
   */
  constructor(message: MessageValueType) {
    super();
    this.question = {
      ...this.getQuestion(),
      message: message,
      type: List,
      min: null,
      max: null,
      minTags: null,
      maxTags: null,
      itemsPerPage: 10,
      helper: false,
      suggestions: null,
      separator: ",",
    };
  }

  /**
   * @inheritDoc IConsoleListPrompt.min
   */
  public min(value: number | null): IConsoleListPrompt {
    this.question.min = value;

    return this;
  }

  /**
   * @inheritDoc IConsoleListPrompt.max
   */
  public max(value: number | null): IConsoleListPrompt {
    this.question.max = value;

    return this;
  }

  /**
   * @inheritDoc IConsoleListPrompt.maxTags
   */
  public maxTags(value: number | null): IConsoleListPrompt {
    this.question.maxTags = value;

    return this;
  }

  /**
   * @inheritDoc IConsoleListPrompt.minTags
   */
  public minTags(value: number | null): IConsoleListPrompt {
    this.question.minTags = value;

    return this;
  }

  /**
   * @inheritDoc IConsoleListPrompt.setSuggestions
   */
  public setSuggestions(
    suggestions: (string | number)[] | null,
  ): IConsoleListPrompt {
    this.question.suggestions = suggestions;

    return this;
  }

  /**
   * @inheritDoc IConsoleListPrompt.addSuggestion
   */
  public addSuggestion(suggestion: string | number): IConsoleListPrompt {
    if (!this.question.suggestions) {
      this.question.suggestions = [];
    }

    this.question.suggestions.push(suggestion);

    return this;
  }

  /**
   * @inheritDoc IConsoleListPrompt.getSuggestions
   */
  public getSuggestions(): (string | number)[] | null {
    return this.question.suggestions;
  }

  /**
   * @inheritDoc IConsoleListPrompt.getItemsPerPage
   */
  public getItemsPerPage(): number {
    return this.question.itemsPerPage;
  }

  /**
   * @inheritDoc IConsoleListPrompt.setItemsPerPage
   */
  public setItemsPerPage(count: number): IConsoleListPrompt {
    this.question.itemsPerPage = count;

    return this;
  }

  /**
   * @inheritDoc IConsoleListPrompt.hideHelper
   */
  public hideHelper(): IConsoleListPrompt {
    this.question.helper = false;

    return this;
  }

  /**
   * @inheritDoc IConsoleListPrompt.showHelper
   */
  public showHelper(): IConsoleListPrompt {
    this.question.helper = true;

    return this;
  }

  /**
   * @inheritDoc IConsoleListPrompt.getSeparator
   */
  public getSeparator(): string | null {
    return this.question.separator;
  }

  /**
   * @inheritDoc IConsoleListPrompt.setSeparator
   */
  setSeparator(sep: string | null): IConsoleListPrompt {
    this.question.separator = sep;

    return this;
  }

  /**
   * @inheritDoc IConsolePrompt.getQuestion
   */
  public getQuestion(): ConsoleListPromptQuestionType {
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
      separator: this.question.separator ?? undefined,
      minLength: this.question.min ?? undefined,
      maxLength: this.question.max ?? undefined,
      minTags: this.question.minTags ?? undefined,
      maxTags: this.question.maxTags ?? undefined,
      suggestions: this.question.suggestions ?? undefined,
      list: this.question.itemsPerPage !== 0,
      maxRows: this.question.itemsPerPage,
      info: this.question.helper,
    };
  }
}
