import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService, // For getting the auth token
    private router: Router // For navigation if authentication fails
  ) {}

  /**
   * Intercepts HTTP requests to add the authorization token and handle errors
   * @param request - The outgoing HTTP request
   * @param next - The next interceptor in the chain
   * @returns Observable of the HTTP event stream
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();

    // If token exists, add it to the request headers
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Add Bearer token to Authorization header
        }
      });
    }

    // Continue with the modified request and handle errors
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // If the error is 401 Unauthorized, the token might be expired or invalid
        if (error.status === 401) {
          this.tokenService.removeToken(); // Remove the invalid token
          this.router.navigate(['/auth/login']); // Redirect to login page
        }
        return throwError(() => error); // Re-throw the error for further handling
      })
    );
  }
}