import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})

export class StoreService {
  constructor(private sessionStorage: SessionStorageService) { }

  // The set method is use for encrypt the value.
  set(keys: any, value: any) {
    const iv = CryptoJS.enc.Utf8.parse(keys);
    const key = btoa(keys);
    this.sessionStorage.clear(key);
    const encrypted = CryptoJS.AES.encrypt((JSON.stringify(value)), key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    sessionStorage.setItem(key, encrypted.toString());
  }

  // The get method is use for decrypt the value.
  get(keys: any) {
    const iv = CryptoJS.enc.Utf8.parse(keys);
    const key = btoa(keys);
    const value = sessionStorage.getItem(key);
    if (value !== null && value !== undefined && value !== '') {
      const decrypted = CryptoJS.AES.decrypt(value, key,
        {
          keySize: 128 / 8,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
      const a = decrypted.toString(CryptoJS.enc.Utf8);
      const c = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
      return c;
    } else {
      return false;
    }

  }

  deleteKey(keys: any) {
    const key = btoa(keys);
    this.sessionStorage.clear(key);
  }
}
