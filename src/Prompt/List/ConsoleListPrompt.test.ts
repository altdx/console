import { assertEquals, List, Mock } from "../../deps.ts";
import { ConsoleListPrompt, ConsoleListPromptQuestionType } from "./mod.ts";

Deno.test("Altdx Console List Prompt - Should have right options", () => {
  const consoleList = new ConsoleListPrompt("");

  const question: ConsoleListPromptQuestionType = {
    name: "answer",
    type: List,
    message: "",
    validator: null,
    min: null,
    max: null,
    minTags: null,
    maxTags: null,
    suggestions: null,
    itemsPerPage: 10,
    helper: false,
    separator: ",",
  };

  assertEquals(question, consoleList.getQuestion());
});

Deno.test("Altdx Console List Prompt - Should set and get name", () => {
  const consoleList = new ConsoleListPrompt("Your name: ");

  assertEquals(true, consoleList.setName("name") instanceof ConsoleListPrompt);
  assertEquals("name", consoleList.getName());
});

Deno.test("Altdx Console List Prompt - Should have List type", () => {
  const consoleList = new ConsoleListPrompt("Your name: ");

  assertEquals(List, consoleList.getType());
});

Deno.test("Altdx Console List Prompt - Should have message", () => {
  const consoleList = new ConsoleListPrompt("Your name: ");

  assertEquals("Your name: ", consoleList.getMessage());
});

Deno.test("Altdx Console List Prompt - Should set and get length", () => {
  const consoleList = new ConsoleListPrompt("Your name: ");
  assertEquals(true, consoleList.min(25) instanceof ConsoleListPrompt);
  assertEquals(25, consoleList.getQuestion().min);
  assertEquals(true, consoleList.max(100) instanceof ConsoleListPrompt);
  assertEquals(100, consoleList.getQuestion().max);
});

Deno.test("Altdx Console List Prompt - Should set tags count", () => {
  const consoleList = new ConsoleListPrompt("");
  assertEquals(true, consoleList.minTags(5) instanceof ConsoleListPrompt);
  assertEquals(5, consoleList.getQuestion().minTags);
  assertEquals(true, consoleList.maxTags(10) instanceof ConsoleListPrompt);
  assertEquals(10, consoleList.getQuestion().maxTags);
});

Deno.test("Altdx Console List Prompt - Should set and get suggestions", () => {
  const consoleList = new ConsoleListPrompt("Your name: ");

  assertEquals(
    true,
    consoleList.setSuggestions(["one", "two"]) instanceof ConsoleListPrompt,
  );
  assertEquals(["one", "two"], consoleList.getSuggestions());

  consoleList.addSuggestion("three");
  assertEquals(["one", "two", "three"], consoleList.getSuggestions());
});

Deno.test("Altdx Console List Prompt - Should set and get items per page", () => {
  const consoleList = new ConsoleListPrompt("Your name: ");

  assertEquals(
    true,
    consoleList.setItemsPerPage(45) instanceof ConsoleListPrompt,
  );
  assertEquals(45, consoleList.getItemsPerPage());
});

Deno.test("Altdx Console List Prompt - Should set and get helper", () => {
  const consoleList = new ConsoleListPrompt("Your name: ");
  assertEquals(true, consoleList.showHelper() instanceof ConsoleListPrompt);
  assertEquals(true, consoleList.getQuestion().helper);
});

Deno.test("Altdx Console List Prompt - Should set and get separator", () => {
  const consoleList = new ConsoleListPrompt("");
  assertEquals(
    true,
    consoleList.setSeparator("|") instanceof ConsoleListPrompt,
  );
  assertEquals("|", consoleList.getSeparator());
});

Deno.test("Altdx Console List Prompt - Should parse options", () => {
  const consoleList = new ConsoleListPrompt("");
  const question: unknown = {
    name: "answer",
    type: List,
    message: "",
    validate: undefined,
    minLength: undefined,
    maxLength: undefined,
    minTags: undefined,
    maxTags: undefined,
    suggestions: undefined,
    list: true,
    maxRows: 10,
    info: false,
    separator: ",",
  };

  assertEquals(question, consoleList.getParseQuestion());
});

Deno.test("Altdx Console List Prompt - Should prompt question", async () => {
  const mock = new Mock();
  mock.spyOn(List, "prompt");

  const list = new ConsoleListPrompt("");
  await list.prompt();

  assertEquals(true, mock.haveBeenCalledWith(list.getParseQuestion()));
});
