import { Injectable } from '@angular/core';

@Injectable()
export class ApiUrlsList {
  officerAPI = 'http://localhost:3000/api/officers';
  episodeAPI = 'http://localhost:3000/api/episodes';
  reportAPI = 'http://localhost:3000/api/reports';
  userAPI = 'http://localhost:3000/api/users';

  constructor() { }

}
