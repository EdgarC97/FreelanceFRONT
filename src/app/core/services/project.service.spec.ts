import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = environment.apiUrl; // Base API URL from environment config

  constructor(private http: HttpClient) {}

  /**
   * Gets all projects for the authenticated user
   * @returns Observable with an array of projects
   */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  /**
   * Gets a specific project by ID
   * @param id - The project ID to retrieve
   * @returns Observable with the project data
   */
  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projects/${id}`);
  }

  /**
   * Creates a new project
   * @param project - The project data to create
   * @returns Observable with the created project
   */
  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/project`, project);
  }

  /**
   * Updates an existing project
   * @param project - The project data to update (must include id)
   * @returns Observable with the updated project
   */
  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/project`, project);
  }

  /**
   * Deletes a project by ID
   * @param id - The project ID to delete
   * @returns Observable with the deletion response
   */
  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/project/${id}`);
  }
}