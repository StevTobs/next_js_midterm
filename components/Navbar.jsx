import { useState } from 'react';

const Navbar = ({ onLogin, onLogout }) => {
  const [token, setToken] = useState(null);
  const [isFeatureVisible, setIsFeatureVisible] = useState(false); // State for toggle

 
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3456/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: "admin", password: "secret" }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setToken(data.token);
      onLogin(data.token);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3456/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setToken(null);
      onLogout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleFeature = () => {
    setIsFeatureVisible(!isFeatureVisible); // Toggle the feature visibility
  };

  return (
    <nav>
      <h1>My App</h1>
      {!token ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={toggleFeature}>
            {isFeatureVisible ? 'Hide Feature' : 'Show Feature'}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
