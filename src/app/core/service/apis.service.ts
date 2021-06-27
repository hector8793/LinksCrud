import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private httpClient: HttpClient) { }

  public getLogin(body: any) {
    return this.httpClient.post("https://private-anon-8bd0512962-henrybravo.apiary-mock.com/login",body);
  }

  public sendRegister(body: any) {
    return this.httpClient.post("https://private-anon-8bd0512962-henrybravo.apiary-mock.com/register",body);
  }

  public getUser(id: any) {
    return this.httpClient.get("https://private-anon-8bd0512962-henrybravo.apiary-mock.com/user/"+id);
  }

  public createLink(body: any) {
    return this.httpClient.post("https://private-anon-8bd0512962-henrybravo.apiary-mock.com/links",body);
  }

  public listLinks() {
    return this.httpClient.get("https://private-anon-8bd0512962-henrybravo.apiary-mock.com/links");
  }

  public deleteLink(id: any) {
    return this.httpClient.delete("https://private-anon-8bd0512962-henrybravo.apiary-mock.com/links/"+ id);
  }
}
