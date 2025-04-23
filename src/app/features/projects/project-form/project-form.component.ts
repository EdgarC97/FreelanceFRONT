import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup; // Form for project inputs
  isEditMode = false; // Flag to track if we're editing or creating
  projectId?: number; // ID of the project being edited
  loading = false; // Flag to track loading state
  submitting = false; // Flag to track form submission state
  error = ''; // Error message to display if operation fails

  constructor(
    private fb: FormBuilder, // For creating reactive forms
    private route: ActivatedRoute, // For accessing route parameters
    private router: Router, // For navigation after save
    private projectService: ProjectService // For project operations
  ) {}

  /**
   * Lifecycle hook that runs when the component initializes
   */
  ngOnInit(): void {
    this.initForm();

    // Check if we're in edit mode by looking for an ID in the route
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.projectId = +id;
      this.loadProject(this.projectId);
    }
  }

  /**
   * Initializes the project form with validators
   */
  initForm(): void {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required]], // Title field with validation
      description: ['', [Validators.required]], // Description field with validation
      start_date: ['', [Validators.required]], // Start date field with validation
      delivery_date: ['', [Validators.required]], // Delivery date field with validation
      status: ['pending', [Validators.required]] // Status field with default value
    });
  }

  /**
   * Loads a project for editing
   * @param id - The ID of the project to load
   */
  loadProject(id: number): void {
    this.loading = true;
    this.projectService.getProject(id).subscribe({
      next: (project) => {
        // Format dates for the date input (YYYY-MM-DD)
        const formattedProject = {
          ...project,
          start_date: this.formatDateForInput(project.start_date),
          delivery_date: this.formatDateForInput(project.delivery_date)
        };

        this.projectForm.patchValue(formattedProject);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load project details.';
        this.loading = false;
        console.error('Error loading project:', error);
      }
    });
  }

  /**
   * Formats a date string for the date input (YYYY-MM-DD)
   * @param dateString - The date string to format
   * @returns Formatted date string
   */
  formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  /**
   * Handles form submission
   */
  onSubmit(): void {
    if (this.projectForm.invalid) {
      return;
    }

    this.submitting = true;

    const projectData: Project = this.projectForm.value;

    if (this.isEditMode && this.projectId) {
      // If editing, include the project ID
      projectData.id = this.projectId;

      this.projectService.updateProject(projectData).subscribe({
        next: (project) => {
          this.router.navigate(['/projects', project.id]);
        },
        error: (error) => {
          this.submitting = false;
          console.error('Error updating project:', error);
          this.error = 'Failed to update project. Please try again.';
        }
      });
    } else {
      // If creating, don't include an ID
      this.projectService.createProject(projectData).subscribe({
        next: (project) => {
          this.router.navigate(['/projects', project.id]);
        },
        error: (error) => {
          this.submitting = false;
          console.error('Error creating project:', error);
          this.error = 'Failed to create project. Please try again.';
        }
      });
    }
  }
}