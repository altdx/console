import { IConsoleResponse } from '@altdx/console-response';
import { consoleCommandCollection } from '@altdx/console-command';
import { consoleCommandCollection as collection, ConsoleCommand } from '@altdx/console-command';

import { printHelp } from '../../printHelp';

export const help = (): IConsoleResponse => {
  return printHelp(consoleCommandCollection);
};

collection.add(
  new ConsoleCommand({
    name: 'help',
    description: 'Command line documentation. Print this documentation.',
    shortOptions: {
      h: {
        desc: 'Short option to run help command',
      },
    },
    longOptions: {},
    run: help,
  }),
);
