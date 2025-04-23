import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    public authService: AuthService, // Injected as public to use in template
    private router: Router // For navigation after logout
  ) {}

  /**
   * Logs out the current user and redirects to login page
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}