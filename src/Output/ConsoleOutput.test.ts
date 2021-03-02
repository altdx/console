import { assertEquals, EOL, Mock } from "../deps.ts";
import figures from "https://cdn.skypack.dev/figures@3.2.0?dts";
import { consoleOutput as output } from "./mod.ts";
import { ConsoleStyle } from "../Style/mod.ts";

Deno.test("Altdx Console Output - Should write text", () => {
  const mock = new Mock();
  const encoder = new TextEncoder();
  const style = new ConsoleStyle();
  mock.spyOn(Deno.stdout, "writeSync");
  const message = "Hello";

  output.write(message);
  assertEquals(true, mock.haveBeenCalledTimes(1));
  assertEquals(true, mock.haveBeenCalledWith(encoder.encode(message)));

  style.color("green");
  output.write(message, style);
  assertEquals(
    true,
    mock.haveBeenCalledWith(encoder.encode(style.render(message))),
  );
  style.color("red");
  assertEquals(
    false,
    mock.haveBeenCalledWith(encoder.encode(style.render(message))),
  );
  mock.resetStdoutWriteSync();
});

Deno.test("Altdx Console Output - Should write text with new line", () => {
  const mock = new Mock();
  const encoder = new TextEncoder();
  mock.spyOn(Deno.stdout, "writeSync");
  const message = "Hello";

  output.writeln(message);
  assertEquals(true, mock.haveBeenCalledTimes(1));
  assertEquals(true, mock.haveBeenCalledWith(encoder.encode(message + EOL.LF)));
  mock.resetStdoutWriteSync();
});

Deno.test("Altdx Console Output - Should write new line", () => {
  const mock = new Mock();
  mock.spyOn(Deno.stdout, "writeSync");
  const encoder = new TextEncoder();

  output.newLine();
  assertEquals(true, mock.haveBeenCalledTimes(1));
  assertEquals(true, mock.haveBeenCalledWith(encoder.encode(EOL.LF)));
  output.newLine(2);
  assertEquals(true, mock.haveBeenCalledWith(encoder.encode(EOL.LF.repeat(2))));
  mock.resetStdoutWriteSync();
});

Deno.test("Altdx Console Output - Should write space", () => {
  const mock = new Mock();
  mock.spyOn(Deno.stdout, "writeSync");
  const encoder = new TextEncoder();

  output.space();
  assertEquals(true, mock.haveBeenCalledTimes(1));
  assertEquals(true, mock.haveBeenCalledWith(encoder.encode(" ")));
  output.space(2);
  assertEquals(true, mock.haveBeenCalledWith(encoder.encode(" ".repeat(2))));
  mock.resetStdoutWriteSync();
});

Deno.test("Altdx Console Output - Should write success message", () => {
  const mock = new Mock();
  const style = new ConsoleStyle();
  mock.spyOn(Deno.stdout, "writeSync");
  const encoder = new TextEncoder();
  style.color("green");
  const message = "Hello";

  output.success(message);
  assertEquals(true, mock.haveBeenCalledTimes(1));
  assertEquals(
    true,
    mock.haveBeenCalledWith(
      encoder.encode(style.render(figures.tick + " " + message) + EOL.LF),
    ),
  );
  output.success(message, false);
  assertEquals(
    true,
    mock.haveBeenCalledWith(encoder.encode(style.render(message) + EOL.LF)),
  );
  mock.resetStdoutWriteSync();
});

Deno.test("Altdx Console Output - Should write error message", () => {
  const mock = new Mock();
  const style = new ConsoleStyle();
  mock.spyOn(Deno.stdout, "writeSync");
  const encoder = new TextEncoder();
  style.color("red");
  const message = "Hello";

  output.error(message);
  assertEquals(true, mock.haveBeenCalledTimes(1));
  assertEquals(
    true,
    mock.haveBeenCalledWith(
      encoder.encode(style.render(figures.cross + " " + message) + EOL.LF),
    ),
  );
  output.error(message, false);
  assertEquals(
    true,
    mock.haveBeenCalledWith(encoder.encode(style.render(message) + EOL.LF)),
  );
  mock.resetStdoutWriteSync();
});

Deno.test("Altdx Console Output - Should write info message", () => {
  const mock = new Mock();
  const style = new ConsoleStyle();
  mock.spyOn(Deno.stdout, "writeSync");
  const encoder = new TextEncoder();
  style.color("blue");
  const message = "Hello";

  output.info(message);
  assertEquals(true, mock.haveBeenCalledTimes(1));
  assertEquals(
    true,
    mock.haveBeenCalledWith(
      encoder.encode(style.render(figures.info + " " + message) + EOL.LF),
    ),
  );
  output.info(message, false);
  assertEquals(
    true,
    mock.haveBeenCalledWith(encoder.encode(style.render(message) + EOL.LF)),
  );
  mock.resetStdoutWriteSync();
});

Deno.test("Altdx Console Output - Should write warning message", () => {
  const mock = new Mock();
  const style = new ConsoleStyle();
  mock.spyOn(Deno.stdout, "writeSync");
  const encoder = new TextEncoder();
  style.color("yellow");
  const message = "Hello";

  output.warning(message);
  assertEquals(true, mock.haveBeenCalledTimes(1));
  assertEquals(
    true,
    mock.haveBeenCalledWith(
      encoder.encode(style.render(figures.warning + " " + message) + EOL.LF),
    ),
  );
  output.warning(message, false);
  assertEquals(
    true,
    mock.haveBeenCalledWith(encoder.encode(style.render(message) + EOL.LF)),
  );
  mock.resetStdoutWriteSync();
});
