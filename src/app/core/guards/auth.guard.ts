import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService, // For checking token validity
    private router: Router // For navigation if authentication fails
  ) {}

  /**
   * Determines if a route can be activated based on authentication status
   * @returns Boolean indicating if the route can be activated, or redirects to login
   */
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if the user has a valid token
    if (this.tokenService.isTokenValid()) {
      return true; // Allow navigation to the requested route
    }

    // If not authenticated, redirect to the login page
    this.router.navigate(['/auth/login']);
    return false; // Prevent navigation to the requested route
  }
}