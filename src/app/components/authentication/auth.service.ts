import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private dbUrl =
    'https://goaljutsu-default-rtdb.asia-southeast1.firebasedatabase.app/';
  private authState = new BehaviorSubject<any>(this.getUserData());

  constructor(private http: HttpClient, private router: Router) {}

  // Signup Method - Save user data to Firebase Realtime Database
  signup(email: string, password: string): Observable<any> {
    const user = { email: email, password: password, missions: {} };

    return new Observable((observer) => {
      this.http.get(`${this.dbUrl}users.json`).subscribe((users: any) => {
        let userExists = false;

        // Check if user already exists
        for (let key in users) {
          if (users[key].email === email) {
            userExists = true;
            break;
          }
        }

        if (userExists) {
          observer.error('Email already registered');
        } else {
          this.http
            .post(`${this.dbUrl}users.json`, user)
            .subscribe((response) => {
              observer.next({ message: 'Signup successful' });
              observer.complete();
            });
        }
      });
    });
  }

  // Login Method - Authenticate user and update auth state
  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.http.get(`${this.dbUrl}users.json`).subscribe(
        (users: any) => {
          let loggedInUser: any = null;

          // Match user credentials
          for (let key in users) {
            if (
              users[key].email === email &&
              users[key].password === password
            ) {
              loggedInUser = { ...users[key], id: key };
              break;
            }
          }

          if (loggedInUser) {
            localStorage.setItem('user', JSON.stringify(loggedInUser)); // Save user to localStorage
            this.authState.next(loggedInUser); // Update auth state
            observer.next({ message: 'Login successful' });
            observer.complete();
          } else {
            observer.error('Invalid email or password');
          }
        },
        (error) => {
          observer.error('Error connecting to server');
        }
      );
    });
  }

  // Logout Method - Clear stored user and update auth state
  logout(): void {
    localStorage.removeItem('user'); // Clear stored user
    this.authState.next(null); // Update auth state
  }

  // Auth State Observable
  getAuthState(): Observable<any> {
    return this.authState.asObservable();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user'); // Check if user exists in localStorage
  }

  getUserData(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
