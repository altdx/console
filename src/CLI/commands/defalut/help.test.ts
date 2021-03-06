import { ConsoleCommand, consoleCommandCollection as collection } from '@altdx/console-command';

import '../../commands';
import { help } from './help';

jest.mock('../../printHelp');
import { printHelp } from '../../printHelp';

describe('Altdx default help command', () => {
  const command = collection.get('help');

  it('should run printHelp function', () => {
    help();
    expect(printHelp).toHaveBeenCalled();
  });

  it('should have help command', () => {
    expect(command).toBeInstanceOf(ConsoleCommand);
  });

  it('should have short option', () => {
    const shortOptions = command?.getShortOptions();

    expect(Object.keys(shortOptions ? shortOptions : {})).toEqual(['h']);
  });

  it('should not have long option', () => {
    const longOptions = command?.getLongOptions();

    expect(Object.keys(longOptions ? longOptions : {})).toEqual([]);
  });
});
