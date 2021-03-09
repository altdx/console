import { ConsolePromptQuestionType, IConsolePrompt } from "../mod.ts";

export * from "./ConsoleSelectPrompt.ts";

export type SelectOptionType = {
  name?: string;
  value: string;
  disabled?: boolean;
};

export type ConsoleSelectPromptQuestionType = ConsolePromptQuestionType & {
  itemsPerPage: number;
  options: SelectOptionType[];
  search: string | null;
};

export interface IConsoleSelectPrompt extends IConsolePrompt {
  setItemsPerPage: (count: number) => IConsoleSelectPrompt;
  getItemsPerPage: () => number;
  setOptions: (options: SelectOptionType[]) => IConsoleSelectPrompt;
  addOption: (
    value: string,
    name?: string,
    disabled?: boolean,
  ) => IConsoleSelectPrompt;
  addSeparator: (sep: string) => IConsoleSelectPrompt;
  getOptions: () => SelectOptionType[];
  search: (label: string | null) => IConsoleSelectPrompt;
}
