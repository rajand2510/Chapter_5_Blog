import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProivde = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  }, []);

  const saveUser = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('https://blog-backend-ly16.onrender.com/api/auth/login', {
        email,
        password,
      });

      saveUser(res.data);
      toast.success('Login successful');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  const signup = async (name, email, password) => {
    try {
      await axios.post('https://blog-backend-ly16.onrender.com/api/auth/signup', {
        name,
        email,
        password,
      });

      await login(email, password);
      toast.success('Signup successful');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    toast.info('Logged out');
    navigate('/login');
  };

  // 🔄 Update name function
  const updateName = async (newName) => {
    try {
      const res = await axios.put('https://blog-backend-ly16.onrender.com/api/auth/update-name', {
        name: newName,
      });

      // update localStorage and state
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      toast.success('Name updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update name');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateName }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
