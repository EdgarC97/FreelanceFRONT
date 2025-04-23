import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { FileService } from '../../../core/services/file.service';
import { Project } from '../../../core/models/project.model';
import { ProjectFile } from '../../../core/models/file.model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  standalone: false,
})
export class ProjectDetailComponent implements OnInit {
  projectId!: number; // ID of the current project
  project: Project | null = null; // The project data
  files: ProjectFile[] = []; // Array of project files
  loading = true; // Flag to track project loading state
  fileLoading = true; // Flag to track files loading state
  error = ''; // Error message for project loading
  fileError = ''; // Error message for file loading
  selectedFile: File | null = null; // Currently selected file for upload
  uploading = false; // Flag to track file upload state

  constructor(
    private route: ActivatedRoute, // For accessing route parameters
    private router: Router, // For navigation
    private projectService: ProjectService, // For project operations
    private fileService: FileService // For file operations
  ) {}

  /**
   * Lifecycle hook that runs when the component initializes
   */
  ngOnInit(): void {
    // Get the project ID from the route parameters
    this.projectId = +this.route.snapshot.paramMap.get('id')!;
    this.loadProject();
    this.loadFiles();
  }

  /**
   * Loads the project details from the API
   */
  loadProject(): void {
    this.loading = true;
    this.projectService.getProject(this.projectId).subscribe({
      next: (project) => {
        this.project = project;
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
   * Loads the project files from the API
   */
  loadFiles(): void {
    this.fileLoading = true;
    this.fileService.getFilesByProject(this.projectId).subscribe({
      next: (files) => {
        this.files = files;
        this.fileLoading = false;
      },
      error: (error) => {
        this.fileError = 'Failed to load project files.';
        this.fileLoading = false;
        console.error('Error loading files:', error);
      }
    });
  }

  /**
   * Handles file selection from the file input
   * @param event - The file input change event
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }
  }

  /**
   * Uploads the selected file to the current project
   */
  uploadFile(): void {
    if (!this.selectedFile) {
      return;
    }

    this.uploading = true;
    this.fileService.uploadFile(this.projectId, this.selectedFile).subscribe({
      next: (file) => {
        this.files.push(file);
        this.selectedFile = null;
        this.uploading = false;
        // Reset the file input
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      },
      error: (error) => {
        console.error('Error uploading file:', error);
        alert('Failed to upload file. Please try again.');
        this.uploading = false;
      }
    });
  }

  /**
   * Downloads a file
   * @param fileId - The ID of the file to download
   * @param filename - The original filename to use for the download
   */
  downloadFile(fileId: number, filename: string): void {
    this.fileService.downloadFile(fileId).subscribe({
      next: (blob) => {
        // Create a download link and trigger it
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      },
      error: (error) => {
        console.error('Error downloading file:', error);
        alert('Failed to download file. Please try again.');
      }
    });
  }

  /**
   * Deletes a file after confirmation
   * @param fileId - The ID of the file to delete
   */
  deleteFile(fileId: number): void {
    if (confirm('Are you sure you want to delete this file?')) {
      this.fileService.deleteFile(fileId).subscribe({
        next: () => {
          // Remove the deleted file from the array
          this.files = this.files.filter(file => file.id !== fileId);
        },
        error: (error) => {
          console.error('Error deleting file:', error);
          alert('Failed to delete file. Please try again.');
        }
      });
    }
  }

  /**
   * Deletes the current project after confirmation
   */
  deleteProject(): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(this.projectId).subscribe({
        next: () => {
          this.router.navigate(['/projects']);
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