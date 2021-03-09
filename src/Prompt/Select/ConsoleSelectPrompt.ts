// Todo: Make tests
import { Select } from "../../deps.ts";
import { AbstractConsolePrompt, MessageValueType } from "../mod.ts";
import {
  ConsoleSelectPromptQuestionType,
  IConsoleSelectPrompt,
  SelectOptionType,
} from "./mod.ts";

/**
 * Select console prompt.
 */
export class ConsoleSelectPrompt extends AbstractConsolePrompt
  implements IConsoleSelectPrompt {
  /**
   * Question type for input prompt.
   */
  protected question: ConsoleSelectPromptQuestionType;

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
      type: Select,
      itemsPerPage: 10,
      options: [],
    };
  }

  /**
   * @inheritDoc IConsoleSelectPrompt.getItemsPerPage
   */
  public getItemsPerPage(): number {
    return this.question.itemsPerPage;
  }

  /**
   * @inheritDoc IConsoleSelectPrompt.setItemsPerPage
   */
  public setItemsPerPage(count: number): IConsoleSelectPrompt {
    this.question.itemsPerPage = count;

    return this;
  }

  public addOption(
    value: string,
    name?: string,
    disabled = true,
  ): IConsoleSelectPrompt {
    this.question.options.push({ name, value, disabled });

    return this;
  }

  public getOptions(): SelectOptionType[] {
    return this.question.options;
  }

  public setOptions(options: SelectOptionType[]): IConsoleSelectPrompt {
    this.question.options = options;

    return this;
  }

  public addSeparator(sep: string): IConsoleSelectPrompt {
    this.question.options.push(Select.separator(sep));

    return this;
  }

  public search(label: string | null): IConsoleSelectPrompt {
    this.question.search = label;

    return this;
  }

  /**
   * @inheritDoc IConsolePrompt.getQuestion
   */
  public getQuestion(): ConsoleSelectPromptQuestionType {
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
      list: this.question.itemsPerPage !== 0,
      maxRows: this.question.itemsPerPage,
      options: this.question.options,
      search: this.question.search !== null,
      searchLabel: this.question.search ?? undefined,
    };
  }
}
