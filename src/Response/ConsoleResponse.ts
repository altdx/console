import { EResponseType, IConsoleResponse, StatusType } from "./mod.ts";

/**
 * Altdx Console Response
 */
export class ConsoleResponse implements IConsoleResponse {
  private status: StatusType = EResponseType.SUCCESS;
  private statusMessage: string = EResponseType.SUCCESS_MESSAGE;
  private data: unknown;

  /**
   * @inheritDoc IConsoleResponse.setStatus
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
   * @inheritDoc IConsoleResponse.setStatusMessage
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

  /**
   * @inheritDoc IConsoleResponse.hasData
   */
  public hasData(): boolean {
    return this.data !== undefined;
  }

  /**
   * @inheritDoc IConsoleResponse.setData
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
