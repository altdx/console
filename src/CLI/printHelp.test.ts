import { printHelp } from './printHelp';
import { ConsoleCommand, ConsoleCommandCollection } from '@altdx/console-command';
import { consoleFigure as figure } from '@altdx/console-figure';
jest.mock('@altdx/console-output');
import { consoleOutput } from '@altdx/console-output';

describe('Altdx printHelp function', () => {
  const collection = new ConsoleCommandCollection();
  collection.add(
    new ConsoleCommand({
      name: 'c1',
      description: 'desc1',
      longOptions: {
        long: {
          desc: 'long desc',
        },
      },
      shortOptions: {
        s: {
          desc: 'short desc',
          required: true,
        },
      },
      run: jest.fn(),
    }),
  );

  printHelp(collection);

  it('should run output.newLine()', () => {
    expect(consoleOutput.newLine).toHaveBeenCalledTimes(4);
  });

  it('should run output.write()', () => {
    expect(consoleOutput.write).toHaveBeenCalledTimes(6);
    expect(consoleOutput.write).toHaveBeenCalledWith(figure.squareFilled() + ' ');
  });

  it('should run output.writeln()', () => {
    expect(consoleOutput.writeln).toHaveBeenCalledTimes(3);
  });

  // it('should print long options', () => {
  // style.reset().color('magenta', true);
  // output.write('--' + key + ' ', style);
  // output.write(longOptions[key].desc);
  //
  // expect(consoleOutput.writeln).toHaveBeenCalledTimes(3);
  // });
});
