import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private http: HttpClient) { }

  get(base_url: string) {
    return this.http.get<any>(`${base_url}`).pipe(timeout(60000));
  }
  getById(base_url: string, cod: any) {
    return this.http.get(`${base_url}/${cod}`).pipe(timeout(60000));
  }
  post(base_url: string, object: any) {
    return this.http.post<any>(`${base_url}`, object).pipe(timeout(60000));
  }
  delete(base_url: string, cod: number) {
    return this.http.delete(`${base_url}/${cod}`).pipe(timeout(60000));
  }
  update(base_url: string, object: any) {
    return this.http.put(`${base_url}/${object.id}`, object).pipe(timeout(60000));
  }
  patch(base_url: string, cod: any, object: any) {
    return this.http.patch(`${base_url}/${cod}`, object).pipe(timeout(60000));
  }
}
