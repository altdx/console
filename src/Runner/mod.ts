import {IError} from "../Error/mod.ts";

export * from "./Runner.ts";
export * from "./DenoRunner.ts";

export type DenoPermissionType =
  | "all"
  | "env"
  | "hrtime"
  | "net"
  | "plugin"
  | "read"
  | "run"
  | "write";

export interface IRunner {
  hasError: () => boolean;
  getStatus: () => number;
  getError: () => IError | null;
  getOutput: () => string | null;
  run: (command: string, ...args: string[]) => Promise<void>;
}

export interface IDenoRunner {
  allow: (...permissions: DenoPermissionType[]) => this;
  allowAll: (allow: boolean | string) => this;
  allowEnv: (allow: boolean | string) => this;
  allowHrtime: (allow: boolean | string) => this;
  allowNet: (allow: boolean | string) => this;
  allowPlugin: (allow: boolean | string) => this;
  allowRead: (allow: boolean | string) => this;
  allowRun: (allow: boolean | string) => this;
  allowWrite: (allow: boolean | string) => this;
  unstable: (unstable: boolean) => this;
  verbose: (verbose: boolean) => this;
  run: (...args: string[]) => Promise<void>;
  watch: (...args: string[]) => Promise<void>;
}
