import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { goal } from '../models/goal.model';

const baseUrl =
  'https://goaljutsu-default-rtdb.asia-southeast1.firebasedatabase.app/users';

@Injectable({
  providedIn: 'root',
})
export class goalService {
  constructor(private http: HttpClient) {}

  // Helper to get logged-in user's ID
  private getUserId(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : null;
  }

  // Get all goals (missions) for the logged-in user
  getAll(): Observable<goal[]> {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('User is not logged in.');
    }
    return this.http.get<goal[]>(`${baseUrl}/${userId}/missions.json`);
  }

  // Get a specific goal for the logged-in user
  get(id: any): Observable<goal> {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('User is not logged in.');
    }
    return this.http.get<goal>(`${baseUrl}/${userId}/missions/${id}.json`);
  }

  // Create a new goal for the logged-in user
  create(data: goal): Observable<any> {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('User is not logged in.');
    }
    return this.http.post(`${baseUrl}/${userId}/missions.json`, data);
  }

  // Update a specific goal for the logged-in user
  update(id: any, data: any): Observable<any> {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('User is not logged in.');
    }
    return this.http.put(`${baseUrl}/${userId}/missions/${id}.json`, data);
  }

  // Delete a specific goal for the logged-in user
  delete(id: any): Observable<any> {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('User is not logged in.');
    }
    return this.http.delete(`${baseUrl}/${userId}/missions/${id}.json`);
  }

  // Delete all goals for the logged-in user
  deleteAll(): Observable<any> {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('User is not logged in.');
    }
    return this.http.delete(`${baseUrl}/${userId}/missions.json`);
  }

  // Find goals by title for the logged-in user
  findByTitle(title: string): Observable<goal[]> {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('User is not logged in.');
    }

    // Firebase doesn't support queries directly on nested objects,
    // so you need to retrieve all goals and filter them client-side.
    return new Observable((observer) => {
      this.getAll().subscribe({
        next: (goals: goal[]) => {
          let goalsArray = Object.values(goals);
          const filteredGoals = goalsArray.filter((goal) =>
            goal.title?.toLowerCase().includes(title.toLowerCase())
          );
          observer.next(filteredGoals);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }
}
