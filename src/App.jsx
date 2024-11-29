import './App.css'
import { Route, Routes, Link } from 'react-router-dom'
import { Navbar } from './components/navbar'
import CvDetails from './pages/CvDetails'
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from './pages/Home'
import CvForm from './pages/cvForm'
import AllCvList from './pages/AllCvList';
import UserCvList from './pages/UserCvList';
import UserRecommendation from './pages/UserRecommandation';
import CvDetail from './components/cvDetail';

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<AllCvList />} />
        <Route path="/cv/:id" element={<CvDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create/cv" element={<CvForm />} />
        <Route path="/userCv" element={<UserCvList />} />
        <Route path="/userRecommandation" element={<UserRecommendation/>}/>
        <Route path="/test/:id" element={<CvDetail/>}/>
      </Routes>
    </div>
  )
}

export default App;
