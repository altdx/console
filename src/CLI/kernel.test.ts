import { ConsoleCommand, consoleCommandCollection as collection, ConsoleCommandType } from '@altdx/console-command';
import {
  COMMAND_NOT_FOUND,
  COMMAND_NOT_FOUND_MESSAGE,
  ConsoleResponse,
  MISSING_OPTION,
  SUCCESS,
  SUCCESS_MESSAGE,
} from '@altdx/console-response';

import { run } from './kernel';

describe('Altdx cli kernel', () => {
  const def: ConsoleCommandType = {
    name: 'myCommand',
    description: 'Description of my command',
    shortOptions: {
      h: {
        desc: 'Short option to run help command',
      },
    },
    longOptions: {
      long: {
        desc: 'Short option to run help command',
        required: true,
      },
    },
    run: jest.fn().mockReturnValue(new ConsoleResponse()),
  };

  const def2: ConsoleCommandType = {
    name: 'myCommand2',
    description: 'Description of my command',
    shortOptions: {
      h: {
        desc: 'Short option to run help command',
        required: true,
      },
    },
    longOptions: {},
    run: jest.fn().mockReturnValue(new ConsoleResponse()),
  };

  collection.add(new ConsoleCommand(def));
  collection.add(new ConsoleCommand(def2));

  it('should have command', () => {
    const response = run(['myCommand', '--long']);

    expect(response).toBeInstanceOf(ConsoleResponse);
    expect(def.run).toHaveBeenCalledTimes(1);
    expect(response.hasError()).toBeFalsy();
    expect(response.getStatusCode()).toEqual(SUCCESS);
    expect(response.getStatusMessage()).toEqual(SUCCESS_MESSAGE);
  });

  it('should not have command', () => {
    const response = run(['myCommandBad', '--bad']);
    def.run = jest.fn().mockReturnValue(new ConsoleResponse());

    expect(def.run).not.toHaveBeenCalled();
    expect(response.hasError()).toBeTruthy();
    expect(response.getStatusCode()).toEqual(COMMAND_NOT_FOUND);
    expect(response.getStatusMessage()).toEqual(COMMAND_NOT_FOUND_MESSAGE);
  });

  it('should not have option', () => {
    let response = run(['myCommand', '--bad']);
    def.run = jest.fn().mockReturnValue(new ConsoleResponse());

    expect(def.run).not.toHaveBeenCalled();
    expect(response.hasError()).toBeTruthy();
    expect(response.getStatusCode()).toEqual(MISSING_OPTION);

    response = run(['myCommand2']);
    def.run = jest.fn().mockReturnValue(new ConsoleResponse());

    expect(def.run).not.toHaveBeenCalled();
    expect(response.hasError()).toBeTruthy();
    expect(response.getStatusCode()).toEqual(MISSING_OPTION);
  });
});
