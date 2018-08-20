import { Injectable } from '@angular/core';

@Injectable()
export class AuthTypesList {
  get authTypes(): string[] {
    return ['Administrator', 'Author', 'View Only'];
  }
}
