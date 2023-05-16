import { useContext } from 'react';
import AuthContext from '@/components/contexts/AuthContext';

function MyComponent() {
  const { isLoggedIn } = useContext(AuthContext);

  // Use the isLoggedIn state in your component logic
  // For example, conditionally render content based on the login status

  return (
    <div>
      {isLoggedIn ? <p>Welcome, User!</p> : <p>Please log in.</p>}
    </div>
  );
}

export default MyComponent;