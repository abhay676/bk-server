import { Response } from 'express';
class GenerateResponse {
  private readonly status: number;
  private readonly message: string | null;
  private readonly data: Array<object> | object | null;
  private readonly res: Response;
  constructor(res: Response, status: number, message: string | null, data: Array<object> | object) {
    this.res = res;
    this.status = status;
    this.message = message;
    this.data = data;
  }
  apiResponse() {
    if (this.status === 200) {
      return this.res.json({
        status: this.status,
        message: 'Success',
        result: {
          message: this.message,
          data: this.data,
        },
      });
    } else if (this.status >= 400 && this.status < 500) {
      return this.res.json({
        status: this.status,
        message: 'Validation Failed',
        result: {
          message: this.message,
          data: this.data,
        },
      });
    } else {
      return this.res.json({
        status: this.status,
        message: 'Failed',
        result: {
          message: this.message,
          data: null,
        },
      });
    }
  }
}

export default GenerateResponse;
