import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private dbUrl =
    'https://goaljutsu-default-rtdb.asia-southeast1.firebasedatabase.app/';

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

  // Login Method - Check if the user exists and authenticate
  login(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.http.get(`${this.dbUrl}users.json`).subscribe(
        (users: any) => {
          let userFound = false;
          let userValid = false;

          // Check for user and password match
          for (let key in users) {
            if (users[key].email === email) {
              userFound = true;
              if (users[key].password === password) {
                userValid = true;
                // Store the user data and missions if valid
                localStorage.setItem('user', JSON.stringify(users[key]));
                break;
              }
            }
          }

          if (userFound && userValid) {
            observer.next({ message: 'Login successful' });
            observer.complete();
          } else if (!userFound) {
            observer.error('Email not found');
          } else if (!userValid) {
            observer.error('Incorrect password');
          }
        },
        (error) => {
          observer.error('Error fetching users');
        }
      );
    });
  }

  // Logout Method - Clear user session
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // Check if user is authenticated (check for user in localStorage)
  isAuthenticated(): boolean {
    return !!localStorage.getItem('user'); // Return true if user is found in localStorage
  }

  // Get the logged-in user's data from localStorage
  getUserData(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
