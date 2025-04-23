import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  standalone: false,
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = []; // Array to store projects
  loading = true; // Flag to track loading state
  error = ''; // Error message to display if loading fails

  constructor(private projectService: ProjectService) {}

  /**
   * Lifecycle hook that runs when the component initializes
   */
  ngOnInit(): void {
    this.loadProjects();
  }

  /**
   * Loads projects from the API
   */
  loadProjects(): void {
    this.loading = true;
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load projects. Please try again.';
        this.loading = false;
        console.error('Error loading projects:', error);
      }
    });
  }

  /**
   * Deletes a project after confirmation
   * @param id - The ID of the project to delete
   */
  deleteProject(id: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => {
          // Remove the deleted project from the array
          this.projects = this.projects.filter(project => project.id !== id);
        },
        error: (error) => {
          console.error('Error deleting project:', error);
          alert('Failed to delete project. Please try again.');
        }
      });
    }
  }

  /**
   * Returns the CSS class for a project status
   * @param status - The project status
   * @returns The corresponding CSS class
   */
  getStatusClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'in progress':
        return 'status-progress';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  }
}