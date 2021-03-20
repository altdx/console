import { assertEquals, Confirm, Mock } from "../../deps.ts";
import {
  ConsoleConfirmPrompt,
  ConsoleConfirmPromptQuestionType,
} from "./mod.ts";

Deno.test("Altdx Console Confirm Prompt - Should have right options", () => {
  const consoleConfirm = new ConsoleConfirmPrompt("Confirm? ");

  const question: ConsoleConfirmPromptQuestionType = {
    name: "answer",
    type: Confirm,
    message: "Confirm? ",
    validator: null,
  };

  assertEquals(question, consoleConfirm.getQuestion());
});

Deno.test("Altdx Console Confirm Prompt - Should set and get name", () => {
  const consoleConfirm = new ConsoleConfirmPrompt("Confirm? ");
  assertEquals(
    true,
    consoleConfirm.setName("confirm") instanceof ConsoleConfirmPrompt,
  );
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

Deno.test("Altdx Console Confirm Prompt - Should parse options", () => {
  const consoleConfirm = new ConsoleConfirmPrompt("");

  const question: unknown = {
    name: "answer",
    type: Confirm,
    message: "",
    validate: undefined,
  };

  assertEquals(question, consoleConfirm.getParseQuestion());
});

Deno.test("Altdx Console Confirm Prompt - Should prompt question", async () => {
  const mock = new Mock();
  mock.spyOn(Confirm, "prompt");

  const confirm = new ConsoleConfirmPrompt("");
  await confirm.prompt();

  assertEquals(true, mock.haveBeenCalledWith(confirm.getParseQuestion()));
});
