import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { goal } from '../models/goal.model';

//const baseUrl = 'http://localhost:8080/api/Goals';
const baseUrl = 'https://achievify-d7672-default-rtdb.asia-southeast1.firebasedatabase.app/goals.json';

@Injectable({
  providedIn: 'root',
})
export class goalService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<goal[]> {
    return this.http.get<goal[]>(baseUrl);
  }

  get(id: any): Observable<goal> {
    return this.http.get<goal>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<goal[]> {
    return this.http.get<goal[]>(`${baseUrl}?title=${title}`);
  }
}
