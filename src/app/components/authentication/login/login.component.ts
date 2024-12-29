import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    console.log('Login button clicked'); // Log button click
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in both fields';
      return;
    }

    this.isLoading = true; // Show loader
    this.errorMessage = ''; // Clear previous errors

    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('jyfjfj', response); // Log successful login
        this.isLoading = false; // Hide loader
        this.router.navigate(['/goals']); // Redirect to the main page
      },
      (error) => {
        console.log('Login error', error); // Log login error
        this.isLoading = false; // Hide loader
        this.errorMessage = error; // Display error message
      }
    );
  }
}
