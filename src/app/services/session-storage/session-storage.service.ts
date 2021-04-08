import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() {}

  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    return JSON.parse(sessionStorage.getItem(key) as any);
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
}
