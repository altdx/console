import { consoleStyle as style } from "../Style/mod.ts";
import { consoleOutput as output } from "../Output/mod.ts";
import { ConsoleRequest } from "../Request/mod.ts";
import {
  ConsoleResponse,
  IConsoleResponse,
  EResponseType
} from "../Response/mod.ts";
import {IConsoleCommandCollection} from "../Command/mod.ts";
import {EOL} from "../deps.ts";

export const run = (args: string[], collection: IConsoleCommandCollection): IConsoleResponse => {
  const request = new ConsoleRequest();
  const response = new ConsoleResponse();

  request.parse(args);

  const commandName = request.getCommand();

  if (!commandName) {
    response.setStatus(EResponseType.COMMAND_NOT_FOUND).setStatusMessage(EResponseType.COMMAND_NOT_FOUND_MESSAGE);

    return response;
  }

  const command = collection.get(commandName);

  if (!command) {
    response.setStatus(EResponseType.COMMAND_NOT_FOUND).setStatusMessage(EResponseType.COMMAND_NOT_FOUND_MESSAGE);

    return response;
  }

  const isValid = command.isValid(request);
  const errorMessage = command.getErrorMessage();

  if (!isValid && errorMessage) {
    response
      .setStatus(EResponseType.COMMAND_REQUIREMENTS)
      .setStatusMessage(
        EResponseType.MISSING_OPTION_MESSAGE + EOL.LF + style.reset().color('magenta', true).render(errorMessage),
      );

    return response;
  }

  return command.run(request, response);
};

export const terminate = (response: IConsoleResponse): void => {
  if (!response.hasError()) {
    Deno.exit(response.getStatus());
  }

  const title = '[' + response.getStatus() + '] ' + response.getStatusMessage();
  output.newLine().error(title, true);

  Deno.exit(response.getStatus());
};
