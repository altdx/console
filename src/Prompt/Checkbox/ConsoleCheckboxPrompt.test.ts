import {assertEquals, Checkbox, Mock} from "../../deps.ts";
import {
  CheckboxOptionType,
  ConsoleCheckboxPrompt,
  ConsoleCheckboxPromptQuestionType,
} from "./mod.ts";

Deno.test("Altdx Console Checkbox Prompt - Should have right options", () => {
  const consoleCheckbox = new ConsoleCheckboxPrompt("Select some values");

  const question: ConsoleCheckboxPromptQuestionType = {
    name: "answer",
    type: Checkbox,
    message: "Select some values",
    itemsPerPage: 10,
    options: [],
    search: null,
    min: null,
    max: null,
  };

  assertEquals(question, consoleCheckbox.getQuestion());
});

Deno.test("Altdx Console Checkbox Prompt - Should set and get name", () => {
  const consoleCheckbox = new ConsoleCheckboxPrompt("Select some values");
  assertEquals(
    true,
    consoleCheckbox.setName("two") instanceof ConsoleCheckboxPrompt,
  );
  assertEquals("two", consoleCheckbox.getName());
});

Deno.test("Altdx Console Checkbox Prompt - Should have Checkbox type", () => {
  const consoleCheckbox = new ConsoleCheckboxPrompt("Select some values");
  assertEquals(Checkbox, consoleCheckbox.getType());
});

Deno.test("Altdx Console Checkbox Prompt - Should have message", () => {
  const consoleCheckbox = new ConsoleCheckboxPrompt("Select some values");
  assertEquals("Select some values", consoleCheckbox.getMessage());
});

Deno.test("Altdx Console Checkbox Prompt - Should set and get items per page", () => {
  const consoleCheckbox = new ConsoleCheckboxPrompt("Select some values");
  assertEquals(
    true,
    consoleCheckbox.setItemsPerPage(5) instanceof ConsoleCheckboxPrompt,
  );
  assertEquals(5, consoleCheckbox.getItemsPerPage());
});

Deno.test("Altdx Console Checkbox Prompt - Should manage options", () => {
  const options: CheckboxOptionType[] = [
    {
      name: "color",
      value: "red",
    },
  ];

  const consoleCheckbox = new ConsoleCheckboxPrompt("Select some values");
  assertEquals(
    true,
    consoleCheckbox.setOptions(options) instanceof ConsoleCheckboxPrompt,
  );
  assertEquals(options, consoleCheckbox.getOptions());
  consoleCheckbox.addOption("John", "name");
  assertEquals([
    { name: "color", value: "red" },
    { name: "name", value: "John" },
  ], consoleCheckbox.getOptions());
});

Deno.test("Altdx Console Checkbox Prompt - Should set search value", () => {
  const consoleCheckbox = new ConsoleCheckboxPrompt("Select some values");
  assertEquals(
    true,
    consoleCheckbox.search("filter") instanceof ConsoleCheckboxPrompt,
  );
  assertEquals("filter", consoleCheckbox.getQuestion().search);
});

Deno.test("Altdx Console Checkbox Prompt - Should set minimum and maximum options", () => {
  const consoleCheckbox = new ConsoleCheckboxPrompt("Select some values");
  assertEquals(true, consoleCheckbox.min(2) instanceof ConsoleCheckboxPrompt);
  assertEquals(2, consoleCheckbox.getQuestion().min);
  assertEquals(true, consoleCheckbox.max(10) instanceof ConsoleCheckboxPrompt);
  assertEquals(10, consoleCheckbox.getQuestion().max);
});

Deno.test("Altdx Console Checkbox Prompt - Should parse options", () => {
  const consoleCheckbox = new ConsoleCheckboxPrompt("");

  const question: unknown = {
    name: "answer",
    type: Checkbox,
    message: "",
    maxRows: 10,
    options: [],
    search: false,
    searchLabel: undefined,
    minOptions: undefined,
    maxOptions: undefined,
  };

  assertEquals(question, consoleCheckbox.getParseQuestion());
});

Deno.test("Altdx Console Checkbox Prompt - Should prompt question", async () => {
  const mock = new Mock();
  mock.spyOn(Checkbox, "prompt");

  const checkbox = new ConsoleCheckboxPrompt("");
  await checkbox.prompt();

  assertEquals(true, mock.haveBeenCalledWith(checkbox.getParseQuestion()));
});
