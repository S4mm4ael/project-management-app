import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <header>
        <div className="header__wrapper">
          <nav>
            <Link to="/login">
              <button>Sign In</button>
            </Link>
            <Link to="/register">
              <button>Sign Up</button>
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
