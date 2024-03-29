import { assertEquals, Mock, Toggle } from "../../deps.ts";
import { ConsoleTogglePrompt, ConsoleTogglePromptQuestionType } from "./mod.ts";

Deno.test("Altdx Console Toggle Prompt - Should have right options", () => {
  const consoleToggle = new ConsoleTogglePrompt("Confirm? ");

  const question: ConsoleTogglePromptQuestionType = {
    name: "answer",
    type: Toggle,
    message: "Confirm? ",
    validator: null,
  };

  assertEquals(question, consoleToggle.getQuestion());
});

Deno.test("Altdx Console Toggle Prompt - Should set and get name", () => {
  const consoleToggle = new ConsoleTogglePrompt("Confirm? ");
  assertEquals(
    true,
    consoleToggle.setName("confirm") instanceof ConsoleTogglePrompt,
  );
  assertEquals("confirm", consoleToggle.getName());
});

Deno.test("Altdx Console Toggle Prompt - Should have Toggle type", () => {
  const consoleToggle = new ConsoleTogglePrompt("Confirm? ");
  assertEquals(Toggle, consoleToggle.getType());
});

Deno.test("Altdx Console Toggle Prompt - Should have message", () => {
  const consoleToggle = new ConsoleTogglePrompt("Confirm? ");
  assertEquals("Confirm? ", consoleToggle.getMessage());
});

Deno.test("Altdx Console Toggle Prompt - Should parse options", () => {
  const consoleToggle = new ConsoleTogglePrompt("");

  const question: unknown = {
    name: "answer",
    type: Toggle,
    message: "",
    validate: undefined,
  };

  assertEquals(question, consoleToggle.getParseQuestion());
});

Deno.test("Altdx Console Toggle Prompt - Should prompt question", async () => {
  const mock = new Mock();
  mock.spyOn(Toggle, "prompt");
  const toggle = new ConsoleTogglePrompt("");
  await toggle.prompt();
  assertEquals(true, mock.haveBeenCalledWith(toggle.getParseQuestion()));
});
