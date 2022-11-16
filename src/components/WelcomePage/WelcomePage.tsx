import React from 'react';
import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <>
      <nav>
        <Link to="/login">
          <button>Sign In</button>
        </Link>
        <Link to="/register">
          <button>Sign Up</button>
        </Link>
      </nav>
      <div>Welcome Page</div>
    </>
  );
}

export default WelcomePage;
