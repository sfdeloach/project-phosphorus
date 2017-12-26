import { Injectable } from '@angular/core';

@Injectable()
export class UploadService {
  public headers: string = "date,disposition,officer,call_type\n"; // TODO verify headers

  constructor() { }

  verify(contents: string): {result: boolean, messages: string[]} {
    let verifier = { result: undefined, messages: []}

    // Check headers
    if (this.headers === contents.slice(0, this.headers.length)) {
      verifier.result = true;
    } else {
      verifier.result = false;
      verifier.messages.push("The headers do not match the supported design. Make sure the file you are attempting to upload matches the format provided above.");
    }

    return verifier;
  }

}
