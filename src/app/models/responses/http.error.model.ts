import { HttpHeaders } from '@angular/common/http';

export class HttpErrorResponse {

  constructor(
      message: string,
      error?: ProgressEvent,
      headers?: HttpHeaders,
      name?: string,
      ok?: boolean,
      status?: number,
      statusText?: string,
      url?: string
  ) { }

}
