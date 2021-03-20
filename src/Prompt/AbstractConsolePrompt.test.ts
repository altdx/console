import { assertEquals, Input, Mock } from "../deps.ts";
import { AbstractConsolePrompt } from "./mod.ts";

class FakePrompt extends AbstractConsolePrompt {
  constructor() {
    super();
  }
}

Deno.test("Altdx Console Prompt - Should set and get prompt type", () => {
  const prompt = new FakePrompt();
  assertEquals(true, prompt.setType(Input) instanceof FakePrompt);
  assertEquals(Input, prompt.getType());
});

Deno.test("Altdx Console Prompt - Should set and get prompt name", () => {
  const prompt = new FakePrompt();
  assertEquals(true, prompt.setName("name") instanceof FakePrompt);
  assertEquals("name", prompt.getName());
});

Deno.test("Altdx Console Prompt - Should set and get prompt message", () => {
  const prompt = new FakePrompt();
  assertEquals(
    true,
    prompt.setMessage("Enter your name") instanceof FakePrompt,
  );
  assertEquals("Enter your name", prompt.getMessage());
});

Deno.test("Altdx Console Prompt - Should get right options", () => {
  const prompt = new FakePrompt();
  assertEquals({
    type: Input,
    name: "answer",
    message: "",
  }, prompt.getQuestion());
});

Deno.test("Altdx Console Prompt - Should get right parse options", () => {
  const prompt = new FakePrompt();
  assertEquals({
    type: Input,
    name: "answer",
    message: "",
  }, prompt.getParseQuestion());
});

Deno.test("Altdx Console Prompt - Should prompt question", async () => {
  const mock = new Mock();
  mock.spyOn(Input, "prompt");

  const prompt = new FakePrompt();
  await prompt.prompt();

  assertEquals(true, mock.haveBeenCalledWith(prompt.getParseQuestion()));
});
