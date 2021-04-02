import { Injectable } from '@angular/core';

export const HOME_FIELDS = 'homeFields';
export const BASKETBALL_FIELDS = 'basketballFields';
export const SOCCER_FIELDS = 'soccerFields';
export const ATHLETICS_FIELDS = 'athleticsFields';

export const localStorageKeys = [HOME_FIELDS, BASKETBALL_FIELDS, SOCCER_FIELDS, ATHLETICS_FIELDS];

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

  clearItems(localStorageKey: string = ''): void {
    localStorageKeys.map(key => {
      if (key !== localStorageKey) {
        this.removeItem(key);
      }
    });
  }
}
