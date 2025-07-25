import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import UserProfile from './Pages/UserProfile'
import MainPost from './Pages/MainPost'
import Navbar from './Components/Navbar'
import Comment from './Pages/Comment'
function App() {

  return (
    <>
    <Navbar/>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user' element={<UserProfile />} />
          <Route path='/post' element={<MainPost />} >
          <Route path='/post/comment' element={<Comment/>} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
