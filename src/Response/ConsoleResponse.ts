import { EResponseType, IConsoleResponse, StatusType } from './mod.ts';

/**
 * Altdx Console Response
 */
export class ConsoleResponse implements IConsoleResponse {
  private status: StatusType = EResponseType.SUCCESS;
  private statusMessage: string = EResponseType.SUCCESS_MESSAGE;
  private data: unknown;

  /**
   * Sets status code.
   *
   * @param code - Number of code.
   */
  public setStatus(code: StatusType): this {
    this.status = code;

    return this;
  }

  /**
   * @inheritDoc IConsoleResponse.getStatusCode
   */
  public getStatus(): StatusType {
    return this.status;
  }

  /**
   * Sets status code.
   *
   * @param message - Message of code.
   */
  public setStatusMessage(message: string): this {
    this.statusMessage = message;

    return this;
  }

  /**
   * @inheritDoc IConsoleResponse.getStatusMessage
   */
  public getStatusMessage(): string {
    return this.statusMessage;
  }

  /**
   * @inheritDoc IConsoleResponse.getData
   */
  public getData<T>(): T {
    return this.data as T;
  }

  public hasData(): boolean {
    return this.data !== undefined;
  }

  /**
   * Sets response data.
   *
   * @param data - Data to return.
   */
  public setData(data: unknown): this {
    this.data = data;

    return this;
  }

  /**
   * @inheritDoc IConsoleResponse.hasError
   */
  public hasError(): boolean {
    return this.status !== EResponseType.SUCCESS;
  }
}
