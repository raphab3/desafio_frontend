// https://viacep.com.br/ws/58059845/json/

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class CEPService {
  constructor(private http: HttpClient) { }

  getCEP(cep: any) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json`).pipe(timeout(60000));
  }
}
