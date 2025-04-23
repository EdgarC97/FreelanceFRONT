import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User, AuthResponse } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Base API URL from environment config

  constructor(
    private http: HttpClient, // For making HTTP requests
    private tokenService: TokenService // For managing JWT tokens
  ) {}

  /**
   * Registers a new user
   * @param user - User registration data
   * @returns Observable with the authentication response
   */
  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user);
  }

  /**
   * Authenticates a user with email and password
   * @param credentials - Login credentials (email and password)
   * @returns Observable with the authentication response
   */
  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      // Store the token when login is successful
      tap((response) => {
        if (response && response.token) {
          this.tokenService.setToken(response.token);
        }
      })
    );
  }

  /**
   * Logs out the current user by removing the token
   */
  logout(): void {
    this.tokenService.removeToken();
  }

  /**
   * Checks if a user is currently logged in
   * @returns Boolean indicating if the user is logged in
   */
  isLoggedIn(): boolean {
    return this.tokenService.isTokenValid();
  }

  /**
   * Gets the current user's information from the API
   * @returns Observable with the user data
   */
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user`);
  }
}