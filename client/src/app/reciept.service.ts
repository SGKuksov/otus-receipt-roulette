import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecieptService {
  private baseUrl = 'http://localhost:3000/reciepts';

  constructor(
    private http: HttpClient
  ) {
  }

  getRecieptList(): Observable<Reciept[]> {
    return this.http.get<Reciept[]>(this.baseUrl);
  }

  createReciept(data: Reciept): Observable<{ status: number }> {
    return this.http.post<{ status: number }>(this.baseUrl, data);
  }

  getReciept(id): Observable<Reciept> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.get<Reciept>(url);
  }

  updateReciept(id: string, data: Reciept): Observable<{ status: number }> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.put<{ status: number }>(url, data);
  }

  deleteReciept(id: string): Observable<{ status: number }> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<{ status: number }>(url);
  }
}
