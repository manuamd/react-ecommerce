import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Check if the user was previously logged in
    const storedUsername = localStorage.getItem('username');
    const storedExpirationDate = localStorage.getItem('expirationDate');

    if (storedUsername && storedExpirationDate) {
      const expirationDate = new Date(storedExpirationDate);

      if (expirationDate > new Date()) {
        setUsername(storedUsername);
        setIsLoggedIn(true);
      } else {
        // Clear stored data if it has expired
        localStorage.removeItem('username');
        localStorage.removeItem('expirationDate');
      }
    }
  }, []);

  const login = (username) => {
    setIsLoggedIn(true);
    setUsername(username);

    // Calculate expiration date (7 days from now)
    const expirationDate = new Date(new Date().getTime() + EXPIRATION_TIME);

    // Store login status and username in local storage
    localStorage.setItem('username', username);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);

    // Clear stored data when user logs out
    localStorage.removeItem('username');
    localStorage.removeItem('expirationDate');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}