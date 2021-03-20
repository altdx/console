import { ConsolePromptQuestionType, IConsolePrompt } from "../mod.ts";

export * from "./ConsoleSelectPrompt.ts";

export type SelectValidatorCallback =
  | ((value: string) => boolean | string)
  | null;

export type SelectOptionType = {
  name?: string;
  value: string;
};

export type ConsoleSelectPromptQuestionType = ConsolePromptQuestionType & {
  itemsPerPage: number;
  options: SelectOptionType[];
  search: string | null;
  validator?: SelectValidatorCallback;
};

export interface IConsoleSelectPrompt extends IConsolePrompt {
  setItemsPerPage: (count: number) => IConsoleSelectPrompt;
  getItemsPerPage: () => number;
  setOptions: (options: SelectOptionType[]) => IConsoleSelectPrompt;
  addOption: (value: string, name?: string) => IConsoleSelectPrompt;
  addSeparator: (sep: string) => IConsoleSelectPrompt;
  getOptions: () => SelectOptionType[];
  search: (label: string | null) => IConsoleSelectPrompt;
  /**
   * Should return true if the value is valid, and an error message String otherwise. If false is returned, a default error message is shown.
   */
  validator(callback: SelectValidatorCallback): IConsoleSelectPrompt;
}
