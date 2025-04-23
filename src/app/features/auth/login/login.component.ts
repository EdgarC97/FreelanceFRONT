import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Form for login inputs
  isSubmitting = false; // Flag to track form submission status
  errorMessage = ''; // Error message to display if login fails

  constructor(
    private fb: FormBuilder, // For creating reactive forms
    private authService: AuthService, // For authentication operations
    private router: Router // For navigation after login
  ) {}

  /**
   * Lifecycle hook that runs when the component initializes
   */
  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Initializes the login form with validators
   */
  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email field with validation
      password: ['', [Validators.required, Validators.minLength(6)]] // Password field with validation
    });
  }

  /**
   * Handles form submission
   */
  onSubmit(): void {
    // Don't submit if the form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    // Call the auth service to attempt login
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        // On success, navigate to the projects page
        this.router.navigate(['/projects']);
      },
      error: (error) => {
        // On error, display the error message
        this.isSubmitting = false;
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}