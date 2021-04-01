import { Injectable } from '@angular/core';

export const FIELDS = 'fields';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  public setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key) as any);
  }
  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
