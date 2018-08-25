import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class ApiUrlsList {
  episodeAPI: string;
  officerAPI: string;
  reportAPI: string;
  userAPI: string;

  constructor() {
    const productionAddress = '192.168.1.127';
    console.log(process.env); // TODO: RAT

    if (!environment.production) {
      this.episodeAPI = 'http://localhost:3000/api/episodes';
      this.officerAPI = 'http://localhost:3000/api/officers';
      this.reportAPI = 'http://localhost:3000/api/reports';
      this.userAPI = 'http://localhost:3000/api/users';
    } else {
      this.episodeAPI = `http://${productionAddress}:3000/api/episodes`;
      this.officerAPI = `http://${productionAddress}:3000/api/officers`;
      this.reportAPI = `http://${productionAddress}:3000/api/reports`;
      this.userAPI = `http://${productionAddress}:3000/api/users`;
    }
  }
}
