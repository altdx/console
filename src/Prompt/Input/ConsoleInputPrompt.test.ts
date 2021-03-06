import { assertEquals, Input, Mock } from "../../deps.ts";
import { ConsoleInputPrompt, ConsoleInputPromptQuestionType } from "./mod.ts";

Deno.test("Altdx Console Input Prompt - Should have right options", () => {
  const input = new ConsoleInputPrompt("Your name: ");

  const question: ConsoleInputPromptQuestionType = {
    name: "answer",
    type: Input,
    message: "Your name: ",
    validator: null,
    min: null,
    max: null,
    suggestions: null,
    itemsPerPage: 10,
    helper: false,
  };

  assertEquals(question, input.getQuestion());
});

Deno.test("Altdx Console Input Prompt - Should set and get name", () => {
  const input = new ConsoleInputPrompt("Your name: ");

  assertEquals(true, input.setName("name") instanceof ConsoleInputPrompt);
  assertEquals("name", input.getName());
});

Deno.test("Altdx Console Input Prompt - Should have Input type", () => {
  const input = new ConsoleInputPrompt("Your name: ");

  assertEquals(Input, input.getType());
});

Deno.test("Altdx Console Input Prompt - Should have message", () => {
  const input = new ConsoleInputPrompt("Your name: ");

  assertEquals("Your name: ", input.getMessage());
});

Deno.test("Altdx Console Input Prompt - Should set and get length", () => {
  const input = new ConsoleInputPrompt("Your name: ");

  assertEquals(true, input.min(25) instanceof ConsoleInputPrompt);
  assertEquals(25, input.getQuestion().min);
  assertEquals(true, input.max(100) instanceof ConsoleInputPrompt);
  assertEquals(100, input.getQuestion().max);
});

Deno.test("Altdx Console Input Prompt - Should set and get suggestions", () => {
  const input = new ConsoleInputPrompt("Your name: ");

  assertEquals(
    true,
    input.setSuggestions(["one", "two"]) instanceof ConsoleInputPrompt,
  );
  assertEquals(["one", "two"], input.getSuggestions());

  input.addSuggestion("three");
  assertEquals(["one", "two", "three"], input.getSuggestions());
});

Deno.test("Altdx Console Input Prompt - Should set and get items per page", () => {
  const input = new ConsoleInputPrompt("Your name: ");

  assertEquals(true, input.setItemsPerPage(45) instanceof ConsoleInputPrompt);
  assertEquals(45, input.getItemsPerPage());
});

Deno.test("Altdx Console Input Prompt - Should set and get helper", () => {
  const input = new ConsoleInputPrompt("Your name: ");

  assertEquals(true, input.showHelper() instanceof ConsoleInputPrompt);
  assertEquals(true, input.getQuestion().helper);
});

Deno.test("Altdx Console Input Prompt - Should parse options", () => {
  const input = new ConsoleInputPrompt("Your name: ");

  const question: unknown = {
    name: "answer",
    type: Input,
    message: "Your name: ",
    validate: undefined,
    minLength: undefined,
    maxLength: undefined,
    suggestions: undefined,
    list: true,
    maxRows: 10,
    info: false,
  };

  assertEquals(question, input.getParseQuestion());
});

Deno.test("Altdx Console Input Prompt - Should prompt question", async () => {
  const mock = new Mock();
  mock.spyOn(Input, "prompt");

  const input = new ConsoleInputPrompt("");
  await input.prompt();

  assertEquals(true, mock.haveBeenCalledWith(input.getParseQuestion()));
});
