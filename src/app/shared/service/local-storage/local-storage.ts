import { Injectable } from '@angular/core';
import { AuthInfoKeys } from '../../common/constant';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {

  get(key: string): string | null {
    return localStorage.getItem(key);
  }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }

  deleteAll() {
    localStorage.clear();
  }

  //External
  resetToken(token: string, refreshToken: string){
    this.delete(AuthInfoKeys.access_token);
    this.delete(AuthInfoKeys.refresh_token);
    this.set(AuthInfoKeys.access_token, token);
    this.set(AuthInfoKeys.refresh_token, refreshToken);
  }
}
