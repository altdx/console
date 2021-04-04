import { IError } from "./deps.ts";

export type DenoPermissionType =
  | "all"
  | "env"
  | "hrtime"
  | "net"
  | "plugin"
  | "read"
  | "run"
  | "write";

/**
 * Altdx Runner interface.
 * This interface allows you to run command.
 */
export interface IRunner {
  /**
   * Check if running command has error.
   */
  hasError: () => boolean;

  /**
   * Get status.
   */
  getStatus: () => number;

  /**
   * Get generated error.
   */
  getError: () => IError | null;

  /**
   * Get output message.
   */
  getOutput: () => string | null;

  /**
   * Display output or error message.
   */
  verbose: () => IRunner;

  /**
   * Run some commands.
   * @param command - Command to run.
   * @param args - List of arguments.
   */
  run: (command: string, ...args: string[]) => Promise<void>;
}
