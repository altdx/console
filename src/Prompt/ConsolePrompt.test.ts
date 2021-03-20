import { assertEquals } from "../deps.ts";
import { ConsoleNumberPrompt } from "./Number/mod.ts";
import { ConsoleSecretPrompt } from "./Secret/mod.ts";
import { ConsolePrompt } from "./mod.ts";

const consoleNumber = new ConsoleNumberPrompt("Enter a number");
const consoleSecret = new ConsoleSecretPrompt("Enter a password");

Deno.test("Altdx Console Prompt - Should add prompt", () => {
  const prompt = new ConsolePrompt();
  assertEquals(
    true,
    prompt.setPrompts([consoleNumber]) instanceof ConsolePrompt,
  );
  assertEquals(1, prompt.getPrompts().length);
  assertEquals(true, prompt.addPrompt(consoleSecret) instanceof ConsolePrompt);
  assertEquals(2, prompt.getPrompts().length);
});
