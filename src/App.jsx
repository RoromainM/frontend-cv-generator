import './App.css'
import { Route, Routes, Link } from 'react-router-dom'
import { Home } from './pages/Home'
import { Navbar } from './components/navbar'
import CvList from './pages/CvList'
import CvDetail from './pages/CvDetail'
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/register";
import Login from "./pages/login";

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<CvList />} />
        <Route path="/cv/:id" element={<CvDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App;
