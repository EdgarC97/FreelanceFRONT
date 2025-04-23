import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token'; // Key used for storing the token in localStorage
  private jwtHelper = new JwtHelperService(); // Helper service for JWT operations

  constructor() {}

  /**
   * Stores the JWT token in localStorage
   * @param token - The JWT token to store
   */
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Retrieves the JWT token from localStorage
   * @returns The stored token or null if not found
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Removes the JWT token from localStorage (used during logout)
   */
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Checks if the stored token is valid and not expired
   * @returns Boolean indicating if the token is valid
   */
  isTokenValid(): boolean {
    const token = this.getToken();
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

  /**
   * Decodes the JWT token to access its payload
   * @returns The decoded token payload or null if no token exists
   */
  getDecodedToken(): any {
    const token = this.getToken();
    return token ? this.jwtHelper.decodeToken(token) : null;
  }
}