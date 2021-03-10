import { Checkbox } from "../../deps.ts";
import { AbstractConsolePrompt, MessageValueType } from "../mod.ts";
import {
  CheckboxOptionType,
  ConsoleCheckboxPromptQuestionType,
  IConsoleCheckboxPrompt,
} from "./mod.ts";

export class ConsoleCheckboxPrompt extends AbstractConsolePrompt
  implements IConsoleCheckboxPrompt {
  protected question: ConsoleCheckboxPromptQuestionType;

  constructor(message: MessageValueType) {
    super();
    this.question = {
      ...this.getQuestion(),
      message: message,
      type: Checkbox,
      itemsPerPage: 10,
      options: [],
      search: null,
      max: null,
      min: null,
    };
  }

  public getItemsPerPage(): number {
    return this.question.itemsPerPage;
  }

  public setItemsPerPage(count: number): IConsoleCheckboxPrompt {
    this.question.itemsPerPage = count;

    return this;
  }

  public addOption(
    value: string,
    name?: string,
  ): IConsoleCheckboxPrompt {
    this.question.options.push({ name, value });

    return this;
  }

  public getOptions(): CheckboxOptionType[] {
    return this.question.options;
  }

  public setOptions(options: CheckboxOptionType[]): IConsoleCheckboxPrompt {
    this.question.options = options;

    return this;
  }

  public addSeparator(sep: string): IConsoleCheckboxPrompt {
    this.question.options.push(Checkbox.separator(sep));

    return this;
  }

  public search(label: string | null): IConsoleCheckboxPrompt {
    this.question.search = label;

    return this;
  }

  public min(count: number | null): IConsoleCheckboxPrompt {
    this.question.min = count;

    return this;
  }

  public max(count: number | null): IConsoleCheckboxPrompt {
    this.question.max = count;

    return this;
  }

  public getQuestion(): ConsoleCheckboxPromptQuestionType {
    return this.question;
  }

  public getParseQuestion(): unknown {
    return {
      name: this.question.name,
      type: this.question.type,
      message: this.question.message ?? "",
      maxRows: this.question.itemsPerPage,
      options: this.question.options,
      search: this.question.search !== null,
      searchLabel: this.question.search ?? undefined,
      minOptions: this.question.min ?? undefined,
      maxOptions: this.question.max ?? undefined,
    };
  }
}
