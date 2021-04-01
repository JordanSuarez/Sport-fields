import { Injectable } from '@angular/core';

export const HOME = 'home';
export const BASKETBALL = 'basketball';
export const SOCCER = 'soccer';
export const ATHLETICS = 'athletics';

export const localStorageKeys = [HOME, BASKETBALL, SOCCER, ATHLETICS];

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key) as any);
  }
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clearItems(localStorageKey: string): void {
    localStorageKeys.map(key => {
      if (key !== localStorageKey) {
        this.removeItem(key);
      }
    });
  }
}
