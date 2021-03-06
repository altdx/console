import { IConsoleCommandCollection } from '@altdx/console-command';
import { ConsoleOutput } from '@altdx/console-output';
import { ConsoleStyle } from '@altdx/console-style';
import { ConsoleFigure } from '@altdx/console-figure';
import { ConsoleResponse, IConsoleResponse } from '@altdx/console-response';

export const printHelp = (collection: IConsoleCommandCollection): IConsoleResponse => {
  const output = new ConsoleOutput();
  const style = new ConsoleStyle();
  const figure = new ConsoleFigure();
  const response = new ConsoleResponse();

  output.newLine();

  const commands = Object.values(collection.getAll());

  commands.map(command => {
    style.color('green', true);
    output.write(figure.squareFilled() + ' ');
    output.writeln(command.getName(), style);
    style.reset().color('grey');
    output.writeln(command.getDescription(), style);

    // Options
    const shortOptions = command.getShortOptions();
    const longOptions = command.getLongOptions();

    const shortKeys = Object.keys(shortOptions);
    const longKeys = Object.keys(longOptions);

    if (shortKeys.length > 0 || longKeys.length > 0) {
      style.reset().color('blue', true).underline();
      output.writeln('options', style);
      shortKeys.map(key => {
        style.reset().color('magenta', true);
        output.write('-' + key + ' ', style);
        output.write(shortOptions[key].desc);

        if (shortOptions[key].required) {
          style.reset().color('grey');
          output.write(' [required]', style);
        }

        output.newLine();
      });

      longKeys.map(key => {
        style.reset().color('magenta', true);
        output.write('--' + key + ' ', style);
        output.write(longOptions[key].desc);

        if (longOptions[key].required) {
          style.reset().color('grey');
          output.write(' [required]', style);
        }

        output.newLine();
      });
    }

    output.newLine();
  });

  return response;
};
