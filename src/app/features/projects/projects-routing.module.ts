import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectFormComponent } from './project-form/project-form.component';

// Routes for the projects feature
const routes: Routes = [
  { path: '', component: ProjectListComponent }, // Route for listing all projects
  { path: 'new', component: ProjectFormComponent }, // Route for creating a new project
  { path: 'edit/:id', component: ProjectFormComponent }, // Route for editing a project
  { path: ':id', component: ProjectDetailComponent } // Route for viewing project details
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Register child routes
  exports: [RouterModule] // Export RouterModule for use in ProjectsModule
})
export class ProjectsRoutingModule {}