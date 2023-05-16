import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserLoggedIn();
  }, []); // Run only once on component mount

  async function checkUserLoggedIn() {
    try {
      const response = await fetch("/api/loggedIn");
      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setUserId(data.userId);
        fetchUserData(data.userId); // Fetch user data when logged in
      } else {
        setIsLoggedIn(false);
        setUserId(null);
        setUser(null); // Reset user data when not logged in
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      setIsLoggedIn(false);
      setUserId(null);
      setUser(null); // Reset user data on error
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchUserData(userId) {
    try {
      const response = await fetch(`/api/user?id=${userId}`);
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
      } else {
        console.error("Error fetching user:", data.message);
        setUser(null); // Reset user data on error
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null); // Reset user data on error
    }
  }

  async function signOut() {
    try {
      await fetch("/api/signOut");
      setIsLoggedIn(false);
      setUserId(null);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Render the children when the authentication status is determined
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userId, user, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
