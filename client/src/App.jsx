import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SighnUp from './pages/SignUp';
import SignIn from './pages/Signin';
import About from './pages/about.jsx';
import Profile from './pages/profile.jsx';
import Header from './components/Header.jsx';

export default function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/sign-up" element={<SighnUp/>}/>
      <Route path="/sign-in" element={<SignIn />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/profile" element={<Profile />}/>
    </Routes>
    </BrowserRouter>
  )
}
