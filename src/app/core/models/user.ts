// User interface defines the structure for user data
export interface User {
    id?: number;        // Optional as it might not be present during registration
    name: string;       // User's full name
    email: string;      // User's email address (used for login)
    password?: string;  // Optional as it's not returned from the server after authentication
  }
  
  // AuthResponse interface defines the structure of the authentication response from the API
  export interface AuthResponse {
    message: string;    // Success/error message from the server
    token: string;      // JWT token for authenticated requests
    user: User;         // User information returned after successful authentication
  }