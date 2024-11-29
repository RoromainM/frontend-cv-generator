import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from './pages/Home'
import CvForm from './pages/cvForm'
import AllCvList from './pages/AllCvList';
import UserCvList from './pages/UserCvList';
import UserRecommendation from './pages/UserRecommandation';
import Profileuser from './pages/Profileuser';
import Swagger from './pages/Swagger';


import CvDetail from './components/cvDetail';
import Profileuser from './pages/Profileuser';
import Swagger from './pages/Swagger';



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
        <Route path="/profile" element={<Profileuser/>} />
        <Route path="/swagger" element={<Swagger/>} />

        <Route path="/test/:id" element={<CvDetail/>}/>
        <Route path="/profile" element={<Profileuser/>} />
        <Route path="/swagger" element={<Swagger/>} />

      </Routes>
    </div>
  )
}

export default App;
