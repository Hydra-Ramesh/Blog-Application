import './App.css';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth.js';
import { login, logout } from './store/authSlice.js';
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [dispatch]);

  if (loading) {
    return null;
  }

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;