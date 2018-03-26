import { Injectable } from '@angular/core';

@Injectable()
export class ApiUrlsList {
  officerAPI: string = 'http://localhost:3000/api/officers';
  episodeAPI: string = 'http://localhost:3000/api/episodes';

  constructor() { }

}
