import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import UserProfile from './Pages/UserProfile';
import MainPost from './Pages/MainPost';
import Navbar from './Components/Navbar';
import Comment from './Pages/Comment';
import { LoginPage } from './Pages/LoginPage';
import { SignupPage } from './Pages/SignupPage';
import { AuthProivde } from './Hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';

import { AnimatePresence, motion } from 'framer-motion';
import NotFound from './Pages/NotFound';

function App() {
  const location = useLocation();

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.2, ease: 'easeInOut' },
  };

  return (
    <AuthProivde>
      <Navbar />

      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={
            <motion.div {...pageTransition}><Home /></motion.div>
          } />
          <Route path='/login' element={
            <motion.div {...pageTransition}><LoginPage /></motion.div>
          } />
          <Route path='/signup' element={
            <motion.div {...pageTransition}><SignupPage /></motion.div>
          } />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <motion.div {...pageTransition}><UserProfile /></motion.div>
              </ProtectedRoute>
            }
          />
          <Route path='/post/:postId' element={
            <motion.div {...pageTransition}><MainPost /></motion.div>
          }>
            <Route path='comment' element={<Comment />} />
          </Route>

          <Route path="*" element={
            <motion.div {...pageTransition}><NotFound /></motion.div>
          } />
        </Routes>
      </AnimatePresence>
    </AuthProivde>
  );
}

export default App;
