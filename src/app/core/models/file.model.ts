// ProjectFile interface defines the structure for file data
export interface ProjectFile {
    id: number;        // Optional as it might not be present during upload
    project_id: number; // ID of the project this file belongs to
    filename: string;   // Server-side filename (usually generated)
    original_filename: string; // Original filename from the user's system
    file_type: string;  // MIME type or file extension
    file_size: number;  // File size in bytes
    upload_date: string; // Date when the file was uploaded
    download_url?: string; // Optional URL for direct download (might be generated on demand)
  }