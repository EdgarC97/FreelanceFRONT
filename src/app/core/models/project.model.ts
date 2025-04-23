// Project interface defines the structure for project data
export interface Project {
    id: number;        // Optional as it might not be present during creation
    title: string;      // Project title
    description: string; // Project description
    start_date: string; // Project start date (in string format for API compatibility)
    delivery_date: string; // Project delivery deadline
    status: 'pending' | 'in progress' | 'completed' | 'cancelled'; // Project status (using union type for type safety)
    user_id?: number;   // Optional as it's set by the server based on the authenticated user
  }