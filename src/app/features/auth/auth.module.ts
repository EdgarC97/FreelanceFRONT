import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent, // Component for user login
    RegisterComponent // Component for user registration
  ],
  imports: [
    SharedModule, // Import shared functionality
    AuthRoutingModule // Import auth-specific routes
  ]
})
export class AuthModule {}