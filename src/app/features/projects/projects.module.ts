import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectFormComponent } from './project-form/project-form.component';

@NgModule({
  declarations: [
    ProjectListComponent, // Component for listing projects
    ProjectDetailComponent, // Component for viewing project details
    ProjectFormComponent // Component for creating/editing projects
  ],
  imports: [
    SharedModule, // Import shared functionality
    ProjectsRoutingModule // Import project-specific routes
  ]
})
export class ProjectsModule {}