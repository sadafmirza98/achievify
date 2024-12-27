import { Component, OnInit } from '@angular/core';
import { AuthService } from './components/authentication/auth.service'; // Import AuthService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loader: boolean = false;
  isLoggedIn: boolean = false;
  userData: any = null; // Store logged-in user data

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Check if user is authenticated when the app starts
    this.isLoggedIn = this.authService.isAuthenticated();

    // If the user is logged in, retrieve user data
    if (this.isLoggedIn) {
      this.userData = this.authService.getUserData();
    }

    this.loader = false; // Hide loader after authentication check
  }

  logout(): void {
    this.authService.logout(); // Logout the user via AuthService
    this.isLoggedIn = false; // Update the login state in the UI
    this.userData = null; // Clear the user data
  }
}
