import { Select } from "../../deps.ts";
import { AbstractConsolePrompt, MessageValueType } from "../mod.ts";
import {
  ConsoleSelectPromptQuestionType,
  IConsoleSelectPrompt,
  SelectOptionType,
  SelectValidatorCallback,
} from "./types.ts";

export class ConsoleSelectPrompt extends AbstractConsolePrompt
  implements IConsoleSelectPrompt {
  protected question: ConsoleSelectPromptQuestionType;

  constructor(message: MessageValueType) {
    super();
    this.question = {
      ...this.getQuestion(),
      message: message,
      type: Select,
      validator: null,
      itemsPerPage: 10,
      options: [],
      search: null,
    };
  }

  public getItemsPerPage(): number {
    return this.question.itemsPerPage;
  }

  public setItemsPerPage(count: number): IConsoleSelectPrompt {
    this.question.itemsPerPage = count;

    return this;
  }

  public addOption(
    value: string,
    name?: string,
  ): IConsoleSelectPrompt {
    this.question.options.push({ name, value });

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
   * @inheritDoc IConsoleSelectPrompt.validator
   */
  validator(callback: SelectValidatorCallback): IConsoleSelectPrompt {
    this.question.validator = callback;

    return this;
  }

  public getQuestion(): ConsoleSelectPromptQuestionType {
    return this.question;
  }

  public getParseQuestion(): unknown {
    return {
      name: this.question.name,
      type: this.question.type,
      message: this.question.message ?? "",
      validate: this.question.validator ?? undefined,
      maxRows: this.question.itemsPerPage,
      options: this.question.options,
      search: this.question.search !== null,
      searchLabel: this.question.search ?? undefined,
    };
  }
}
