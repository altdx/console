export * from "./Error.ts";
export * from "./ErrorStack.ts";

export interface IErrorStack {
  getMethod: () => string | null;
  getFile: () => string | null;
  getLine: () => string | null;
  getColumn: () => string | null;
  isNative: () => boolean;
}

export interface IError {
  getMessage: () => string;
  getStacks: () => IErrorStack[] | null;
}
