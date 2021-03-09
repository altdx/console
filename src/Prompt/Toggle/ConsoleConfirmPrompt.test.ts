import { assertEquals, Toggle } from "../../deps.ts";
import { ConsoleTogglePrompt, ConsoleTogglePromptQuestionType } from "./mod.ts";

Deno.test("Altdx Console Toggle Prompt - Should have right options", () => {
  const consoleToggle = new ConsoleTogglePrompt("Confirm? ");

  const question: ConsoleTogglePromptQuestionType = {
    name: "answer",
    type: Toggle,
    message: "Confirm? ",
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
