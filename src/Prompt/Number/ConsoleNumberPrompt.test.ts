import {assertEquals, Mock, Number} from "../../deps.ts";
import { ConsoleNumberPrompt, ConsoleNumberPromptQuestionType } from "./mod.ts";

Deno.test("Altdx Console Number Prompt - Should have right options", () => {
  const consoleNumber = new ConsoleNumberPrompt("Price: ");

  const question: ConsoleNumberPromptQuestionType = {
    name: "answer",
    type: Number,
    message: "Price: ",
    min: null,
    max: null,
    isFloat: false,
    format: 2,
    suggestions: null,
    itemsPerPage: 10,
    helper: false,
  };

  assertEquals(question, consoleNumber.getQuestion());
});

Deno.test("Altdx Console Number Prompt - Should set and get name", () => {
  const consoleNumber = new ConsoleNumberPrompt("Price: ");
  assertEquals(
    true,
    consoleNumber.setName("price") instanceof ConsoleNumberPrompt,
  );
  assertEquals("price", consoleNumber.getName());
});

Deno.test("Altdx Console Number Prompt - Should have Input type", () => {
  const consoleNumber = new ConsoleNumberPrompt("Price: ");
  assertEquals(Number, consoleNumber.getType());
});

Deno.test("Altdx Console Number Prompt - Should have message", () => {
  const consoleNumber = new ConsoleNumberPrompt("Price: ");
  assertEquals("Price: ", consoleNumber.getMessage());
});

Deno.test("Altdx Console Number Prompt - Should set minimum and maximum values", () => {
  const consoleNumber = new ConsoleNumberPrompt("Price: ");
  assertEquals(true, consoleNumber.min(10) instanceof ConsoleNumberPrompt);
  assertEquals(true, consoleNumber.max(200) instanceof ConsoleNumberPrompt);
  assertEquals(10, consoleNumber.getQuestion().min);
  assertEquals(200, consoleNumber.getQuestion().max);
});

Deno.test("Altdx Console Number Prompt - Should set integer input", () => {
  const consoleNumber = new ConsoleNumberPrompt("Price: ");
  assertEquals(true, consoleNumber.integer() instanceof ConsoleNumberPrompt);
  assertEquals(false, consoleNumber.getQuestion().isFloat);
});

Deno.test("Altdx Console Number Prompt - Should set float input with format", () => {
  const consoleNumber = new ConsoleNumberPrompt("Price: ");
  assertEquals(true, consoleNumber.float(4) instanceof ConsoleNumberPrompt);
  assertEquals(true, consoleNumber.getQuestion().isFloat);
  assertEquals(4, consoleNumber.getQuestion().format);
});

Deno.test("Altdx Console Number Prompt - Should set and get suggestions", () => {
  const consoleNumber = new ConsoleNumberPrompt("Price: ");

  assertEquals(
    true,
    consoleNumber.setSuggestions([30, 45, 12]) instanceof ConsoleNumberPrompt,
  );
  assertEquals([30, 45, 12], consoleNumber.getSuggestions());

  consoleNumber.addSuggestion(55);
  assertEquals([30, 45, 12, 55], consoleNumber.getSuggestions());
});

Deno.test("Altdx Console Number Prompt - Should set and get items per page", () => {
  const consoleNumber = new ConsoleNumberPrompt("Price: ");

  assertEquals(
    true,
    consoleNumber.setItemsPerPage(45) instanceof ConsoleNumberPrompt,
  );
  assertEquals(45, consoleNumber.getItemsPerPage());
});

Deno.test("Altdx Console Number Prompt - Should set and get helper", () => {
  const consoleNumber = new ConsoleNumberPrompt("Price: ");

  assertEquals(true, consoleNumber.showHelper() instanceof ConsoleNumberPrompt);
  assertEquals(true, consoleNumber.getQuestion().helper);
});

Deno.test("Altdx Console Number Prompt - Should parse options", () => {
  const consoleNumber = new ConsoleNumberPrompt("Price: ");

  const question: unknown = {
    name: "answer",
    type: Number,
    message: "Price: ",
    min: undefined,
    max: undefined,
    float: false,
    round: 2,
    suggestions: undefined,
    list: false,
    maxRows: 10,
    info: false,
  };

  assertEquals(question, consoleNumber.getParseQuestion());
});

Deno.test("Altdx Console Number Prompt - Should prompt question", async () => {
  const mock = new Mock();
  mock.spyOn(Number, "prompt");

  const numberConsole = new ConsoleNumberPrompt("");
  await numberConsole.prompt();

  assertEquals(true, mock.haveBeenCalledWith(numberConsole.getParseQuestion()));
});
