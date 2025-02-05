import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    // Make a POST request to the login route
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    // Parse the JSON response
    const data = await response.json();

    // Check if the response was successful
    if (!response.ok) {
      throw new Error(data.message || "Login failed. Please try again.");
    }

    // Return the token on successful login
    return data.token;
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export { login };
              
