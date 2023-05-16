import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

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
    }
  }

  async function fetchUserData(userId) {
    try {
      const response = await fetch(`/api/user?id=${userId}`);
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
      } else {
        console.error('Error fetching user:', data.message);
        setUser(null); // Reset user data on error
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null); // Reset user data on error
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userId, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;