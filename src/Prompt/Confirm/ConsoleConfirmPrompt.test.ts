import {assertEquals, Confirm} from "../../deps.ts";
import {ConsoleConfirmPrompt, ConsoleConfirmPromptQuestionType} from "./mod.ts";

Deno.test("Altdx Console Confirm Prompt - Should have right options", () => {
  const consoleConfirm = new ConsoleConfirmPrompt("Confirm? ");

  const question: ConsoleConfirmPromptQuestionType = {
    name: "answer",
    type: Confirm,
    message: "Confirm? ",
  };

  assertEquals(question, consoleConfirm.getQuestion());
});

Deno.test("Altdx Console Confirm Prompt - Should set and get name", () => {
  const consoleConfirm = new ConsoleConfirmPrompt("Confirm? ");
  assertEquals(true, consoleConfirm.setName("confirm") instanceof ConsoleConfirmPrompt);
  assertEquals("confirm", consoleConfirm.getName());
});

Deno.test("Altdx Console Confirm Prompt - Should have Confirm type", () => {
  const consoleConfirm = new ConsoleConfirmPrompt("Confirm? ");
  assertEquals(Confirm, consoleConfirm.getType());
});

Deno.test("Altdx Console Confirm Prompt - Should have message", () => {
  const consoleConfirm = new ConsoleConfirmPrompt("Confirm? ");
  assertEquals("Confirm? ", consoleConfirm.getMessage());
});
