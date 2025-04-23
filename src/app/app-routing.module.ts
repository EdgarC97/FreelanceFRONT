import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

// Main application routes
const routes: Routes = [
  {
    path: 'auth',
    // Lazy load the auth module when the path is 'auth'
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'projects',
    // Lazy load the projects module when the path is 'projects'
    loadChildren: () => import('./features/projects/projects.module').then(m => m.ProjectsModule),
    canActivate: [AuthGuard] // Protect this route with the auth guard
  },
  {
    path: 'files',
    // Lazy load the files module when the path is 'files'
    loadChildren: () => import('./features/files/files.module').then(m => m.FilesModule),
    canActivate: [AuthGuard] // Protect this route with the auth guard
  },
  // Redirect empty path to projects
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  // Redirect any unmatched route to projects
  { path: '**', redirectTo: '/projects' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Register the routes
  exports: [RouterModule] // Export RouterModule for use in other modules
})
export class AppRoutingModule {}