export * from "./ConsoleResponse.ts";

export enum EResponseType {
  NOT_FOUND = 404,
  NOT_FOUND_MESSAGE = "Not found.",
  COMMAND_NOT_FOUND = 404,
  COMMAND_NOT_FOUND_MESSAGE = "Command not found.",
  MISSING_OPTION = 400,
  MISSING_OPTION_MESSAGE = "Missing options:",
  BAD_OPTION = 406,
  BAD_OPTION_MESSAGE = "Not valid option.",
  SUCCESS = 0,
  SUCCESS_MESSAGE = "OK",
}

export type StatusType =
  | EResponseType.SUCCESS
  | EResponseType.NOT_FOUND
  | EResponseType.COMMAND_NOT_FOUND
  | EResponseType.MISSING_OPTION;

/**
 * Altdx Console Response interface
 */
export interface IConsoleResponse {
  /**
   * Gets status code.
   */
  getStatus: () => StatusType;

  /**
   * Sets status code.
   *
   * @param code - Number of code.
   */
  setStatus: (code: StatusType) => IConsoleResponse;

  /**
   * Sets status code.
   *
   * @param message - Message of code.
   */
  setStatusMessage: (message: string) => IConsoleResponse;

  /**
   * Gets status message.
   */
  getStatusMessage: () => string;

  /**
   * Sets response data.
   *
   * @param data - Data to return.
   */
  setData: (data: unknown) => IConsoleResponse;

  /**
   * Gets response data.
   */
  getData: <T>() => T;

  /**
   * Checks if this response has data.
   */
  hasData: () => boolean;

  /**
   * Checks if response has error.
   */
  hasError: () => boolean;
}
