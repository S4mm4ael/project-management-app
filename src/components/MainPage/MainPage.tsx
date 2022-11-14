import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

function MainPage() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div>Main Page</div>
      <button onClick={() => signOut(() => navigate('/', { replace: true }))}>Log out</button>
    </>
  );
}

export default MainPage;
