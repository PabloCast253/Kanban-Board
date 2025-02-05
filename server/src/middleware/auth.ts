import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // Get and decode the JWT token
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  // Check if the user is logged in (i.e., token exists and is valid)
  loggedIn() {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }

  // Check if the token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return true; // If expiration is not set, consider it expired
      return decoded.exp * 1000 < Date.now(); // Convert exp to milliseconds
    } catch (error) {
      return true; // Invalid token means it's expired
    }
  }

  // Retrieve the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Store the token and redirect the user to the home page
  login(idToken: string) {
    localStorage.setItem('token', idToken);
    window.location.href = '/'; // Redirect to the home page
  }

  // Remove the token and redirect the user to the login page
  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to the login page
  }
}

export default new AuthService();
