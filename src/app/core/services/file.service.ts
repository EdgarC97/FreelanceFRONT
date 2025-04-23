import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProjectFile } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = environment.apiUrl; // Base API URL from environment config

  constructor(private http: HttpClient) {}

  /**
   * Gets all files for a specific project
   * @param projectId - The project ID to get files for
   * @returns Observable with an array of project files
   */
  getFilesByProject(projectId: number): Observable<ProjectFile[]> {
    return this.http.get<ProjectFile[]>(`${this.apiUrl}/files/${projectId}`);
  }

  /**
   * Uploads a file to a specific project
   * @param projectId - The project ID to upload the file to
   * @param file - The file to upload
   * @returns Observable with the uploaded file metadata
   */
  uploadFile(projectId: number, file: File): Observable<ProjectFile> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<ProjectFile>(`${this.apiUrl}/file/${projectId}`, formData);
  }

  /**
   * Downloads a file by ID
   * @param fileId - The file ID to download
   * @returns Observable with the file blob
   */
  downloadFile(fileId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/file/${fileId}`, {
      responseType: 'blob' // Important: tells Angular to expect binary data
    });
  }

  /**
   * Deletes a file by ID
   * @param fileId - The file ID to delete
   * @returns Observable with the deletion response
   */
  deleteFile(fileId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/file/${fileId}`);
  }
}