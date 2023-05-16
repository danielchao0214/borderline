import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkUserLoggedIn();
    console.log("Is logged in: ", isLoggedIn);
  }, []);

  async function checkUserLoggedIn() {
    try {
      const response = await fetch("/api/loggedIn");
      const data = await response.json();
      if (response.ok) {
        setIsLoggedIn(true);
        
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      setIsLoggedIn(false);
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
