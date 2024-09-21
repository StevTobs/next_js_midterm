import { useState } from 'react';
import Navbar from '../components/Navbar';
import ItemsList from '../components/ItemsList';

const Home = () => {
  const [token, setToken] = useState(null);
  const [isFeatureVisible, setIsFeatureVisible] = useState(false);

  const handleLogin = (token) => {
    setToken(token);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div>
      <Navbar onLogin={handleLogin} onLogout={handleLogout} />
      {isFeatureVisible && <div>Your feature content goes here!</div>}
      <ItemsList token={token} />
    </div>
  );
};

export default Home;
