import {ConsolePromptQuestionType, IConsolePrompt} from "../types.ts";

export type CheckboxValidatorCallback =
  | ((value: string) => boolean | string)
  | null;

export type CheckboxOptionType = {
  name?: string;
  value: string;
  checked?: boolean;
};

export type ConsoleCheckboxPromptQuestionType = ConsolePromptQuestionType & {
  itemsPerPage: number;
  options: CheckboxOptionType[];
  search: string | null;

  /**
   * Minimum number of selectable options. Defaults to null.
   */
  min: number | null;

  /**
   * Maximum number of selectable options. Defaults to null.
   */
  max: number | null;

  /**
   * Validator callback.
   */
  validator?: CheckboxValidatorCallback;
};

export interface IConsoleCheckboxPrompt extends IConsolePrompt {
  setItemsPerPage: (count: number) => IConsoleCheckboxPrompt;
  getItemsPerPage: () => number;
  setOptions: (options: CheckboxOptionType[]) => IConsoleCheckboxPrompt;
  addOption: (
    value: string,
    name?: string,
    checked?: boolean,
  ) => IConsoleCheckboxPrompt;
  addSeparator: (sep: string) => IConsoleCheckboxPrompt;
  getOptions: () => CheckboxOptionType[];
  search: (label: string | null) => IConsoleCheckboxPrompt;

  /**
   * Set minimum number of selectable options.
   */
  min: (count: number | null) => IConsoleCheckboxPrompt;

  /**
   * Set minimum number of selectable options.
   */
  max: (count: number | null) => IConsoleCheckboxPrompt;

  /**
   * Should return true if the value is valid, and an error message String otherwise. If false is returned, a default error message is shown.
   */
  validator(callback: CheckboxValidatorCallback): IConsoleCheckboxPrompt;
}
