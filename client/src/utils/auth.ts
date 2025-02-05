import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null; // return the decoded token
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token; // return true if the token is present  and false otherwise
  }
  
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return true; // If expiration is not set, consider it expired
      return decoded.exp * 1000 < Date.now(); // Convert exp to milliseconds
    } catch (error) {
      return true; // Invalid token means it's expired
    }
  }

  getToken(): string | null{
    // TODO: return the token
    return localStorage.getItem('token'); // return the token from localStorage
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('token', idToken); // save the token to localStorage
    // TODO: redirect to the home page
    window.location.href = '/'; // Redirect to the home page
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('token');
    // TODO: redirect to the login page
    window.location.href = '/login'; // Redirect to the login page
  }
}

export default new AuthService();
