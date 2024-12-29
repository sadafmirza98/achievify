import { Component, OnInit } from '@angular/core';
import { AuthService } from './components/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loader: boolean = false;
  isLoggedIn: boolean = false;
  userData: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to auth state changes
    this.authService.getAuthState().subscribe((user) => {
      this.isLoggedIn = !!user; // Update login state
      this.userData = user; // Update user data
      this.loader = false; // Ensure loader is hidden
    });
  }

  // Triggered when the user logs out
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login
  }
}
