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

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in both fields';
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log(response); // Successful login response
        this.router.navigate(['/goals']); // Redirect to the main page
      },
      (error) => {
        this.errorMessage = error; // Show error message
      }
    );
  }
}
