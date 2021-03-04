import { assertEquals } from "../deps.ts";
import { ConsoleResponse, EResponseType } from "./mod.ts";

Deno.test("Altdx Console Response - Should have status codes", () => {
  assertEquals(0, EResponseType.SUCCESS);
  assertEquals(404, EResponseType.NOT_FOUND);
  assertEquals(404, EResponseType.COMMAND_NOT_FOUND);
  assertEquals(400, EResponseType.MISSING_OPTION);
  assertEquals(406, EResponseType.BAD_OPTION);
});

Deno.test("Altdx Console Response - Should have status messages", () => {
  assertEquals("OK", EResponseType.SUCCESS_MESSAGE);
  assertEquals("Not found.", EResponseType.NOT_FOUND_MESSAGE);
  assertEquals("Command not found.", EResponseType.COMMAND_NOT_FOUND_MESSAGE);
  assertEquals("Missing options:", EResponseType.MISSING_OPTION_MESSAGE);
  assertEquals("Not valid option.", EResponseType.BAD_OPTION_MESSAGE);
});

Deno.test("Altdx Console Response - Should get status code", () => {
  const response = new ConsoleResponse();
  assertEquals(
    true,
    response.setStatus(EResponseType.NOT_FOUND) instanceof ConsoleResponse,
  );
  assertEquals(EResponseType.NOT_FOUND, response.getStatus());
});

Deno.test("Altdx Console Response - Should get status message", () => {
  const response = new ConsoleResponse();
  assertEquals(
    true,
    response.setStatusMessage(EResponseType.NOT_FOUND_MESSAGE) instanceof
      ConsoleResponse,
  );
  assertEquals(EResponseType.NOT_FOUND_MESSAGE, response.getStatusMessage());
});

Deno.test("Altdx Console Response - Should get response data", () => {
  const response = new ConsoleResponse();
  assertEquals(true, response.setData({ num: 45 }) instanceof ConsoleResponse);
  assertEquals(45, response.getData<{ num: number }>().num);
  assertEquals(true, response.hasData());
});

Deno.test("Altdx Console Response - Should check error", () => {
  const response = new ConsoleResponse();
  assertEquals(
    true,
    response.setStatus(EResponseType.NOT_FOUND) instanceof ConsoleResponse,
  );
  assertEquals(true, response.hasError());
  assertEquals(
    true,
    response.setStatus(EResponseType.SUCCESS) instanceof ConsoleResponse,
  );
  assertEquals(false, response.hasError());
});
