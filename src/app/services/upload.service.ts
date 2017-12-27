import { Injectable } from '@angular/core';
import { Verifier } from '../models/verifier.model';

@Injectable()
export class UploadService {
  public headers: string = '"EventNbr","Init_DateTime","SourceCall","EventType","UnitId","OfcrName","CaseNbr","ClrOfficerBadge"\n';

  constructor() { }

  verify(contents: string): Verifier {
    // Calculate file size
    let fileSize = contents.length;
    let sizeUnits = 'bytes';

    if (fileSize > 1000000) {
      fileSize = Math.trunc(fileSize / 1000000);
      sizeUnits = 'MB';
    } else if (fileSize > 1000) {
      fileSize = Math.trunc(fileSize/1000);
      sizeUnits = 'kB';
    }

    // Check headers
    if (this.headers === contents.slice(0, this.headers.length)) {
      return new Verifier(true, `Valid headers. (${fileSize} ${sizeUnits})`);
    } else {
      return new Verifier(false, `Invalid headers. (${fileSize} ${sizeUnits})`)
    }
  }

}
