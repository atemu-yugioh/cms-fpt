import { StatusCodes, ReasonPhrases } from "http-status-codes";
export class BaseResponse {
  private status: number;
  private message: string;
  private data: Object | null;

  constructor(status?: number, message?: string, data?: object | null) {
    this.status = status ? status : StatusCodes.OK;
    this.message = message ? message : ReasonPhrases.OK;
    this.data = data ? data : null;
  }

  public getStatus(): number {
    return this.status;
  }

  public setStatus(status: number) {
    this.status = status;
  }

  public getMessage(): string {
    return this.message;
  }

  public setMessage(status: number, message: string) {
    if (message) {
      this.message = message;
    } else {
      this.message = StatusCodes[status];
    }
  }

  public getData(): Object | null {
    return this.data;
  }

  public setData(data: Object | null) {
    this.data = data;
  }
}
