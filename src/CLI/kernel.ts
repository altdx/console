import * as os from 'os';
import { consoleStyle as style } from '@altdx/console-style';
import { consoleOutput as output } from '@altdx/console-output';
import { ConsoleRequest } from '@altdx/console-request';
import {
  COMMAND_NOT_FOUND,
  COMMAND_NOT_FOUND_MESSAGE,
  ConsoleResponse,
  IConsoleResponse,
  MISSING_OPTION,
  MISSING_OPTION_MESSAGE,
} from '@altdx/console-response';
import { consoleCommandCollection as collection } from '@altdx/console-command';

export const run = (args: string[]): IConsoleResponse => {
  const request = new ConsoleRequest();
  const response = new ConsoleResponse();

  request.parse(args);

  const commandName = request.getCommand();

  if (!commandName) {
    response.setStatusCode(COMMAND_NOT_FOUND).setStatusMessage(COMMAND_NOT_FOUND_MESSAGE);

    return response;
  }

  const command = collection.get(commandName);

  if (!command) {
    response.setStatusCode(COMMAND_NOT_FOUND).setStatusMessage(COMMAND_NOT_FOUND_MESSAGE);

    return response;
  }

  let hasError = false;
  const missingOptions: string[] = [];

  // Short options

  let options = request.getShortOptions();
  let commandOptions = command.getShortOptions();

  Object.keys(commandOptions).map(option => {
    if (commandOptions[option].required) {
      if (!options.hasOwnProperty(option)) {
        hasError = true;
        missingOptions.push('-' + option);
      }
    }
  });

  // Long options

  options = request.getLongOptions();
  commandOptions = command.getLongOptions();

  Object.keys(commandOptions).map(option => {
    if (commandOptions[option].required) {
      if (!options.hasOwnProperty(option)) {
        hasError = true;
        missingOptions.push('--' + option);
      }
    }
  });

  if (hasError) {
    response
      .setStatusCode(MISSING_OPTION)
      .setStatusMessage(
        MISSING_OPTION_MESSAGE + os.EOL + style.reset().color('magenta', true).render(missingOptions.join(', ')),
      );

    return response;
  }

  return command.run(request, response);
};

export const terminate = (response: IConsoleResponse): void => {
  if (!response.hasError()) {
    process.exit(response.getStatusCode());
  }

  const title = '[' + response.getStatusCode() + '] ' + response.getStatusMessage();
  output.newLine().error(title, true);

  process.exit(response.getStatusCode());
};
