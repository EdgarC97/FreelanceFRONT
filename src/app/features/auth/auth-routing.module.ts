import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// Routes for the auth feature
const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Route for login page
  { path: 'register', component: RegisterComponent }, // Route for registration page
  { path: '', redirectTo: 'login', pathMatch: 'full' } // Default to login page
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Register child routes
  exports: [RouterModule] // Export RouterModule for use in AuthModule
})
export class AuthRoutingModule {}