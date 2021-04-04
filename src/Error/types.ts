/**
 * Altdx ErrorStack interface.
 * This interface allows you to handle error stack.
 */
export interface IErrorStack {
  getMethod: () => string | null;
  getFile: () => string | null;
  getLine: () => string | null;
  getColumn: () => string | null;
  isNative: () => boolean;
}

/**
 * Altdx Error interface.
 * This interface allows you to handle error.
 */
export interface IError {
  /**
   * Get error message.
   */
  getMessage: () => string;

  /**
   * Get error status.
   */
  getStatus: () => number;

  /**
   * Get error stacks.
   */
  getStacks: () => IErrorStack[] | null;

  /**
   * Display error.
   */
  verbose: () => IError;
}
