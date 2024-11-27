import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Navbar } from './components/navbar'
import CvList from './pages/CvList'
import CvDetail from './pages/CvDetail'

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<CvList />} />
        <Route path="/cv/:id" element={<CvDetail />} />
      </Routes>
    </div>
  )
}

export default App
