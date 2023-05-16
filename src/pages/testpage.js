import { useContext, useEffect } from 'react';
import AuthContext from '@/components/contexts/AuthContext';

function MyComponent() {
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <div>
      {isLoggedIn && user ? (
        <p>Welcome, {user.firstName}!</p>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
}

export default MyComponent;