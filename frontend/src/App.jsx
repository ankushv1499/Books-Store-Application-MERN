import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer/Footer'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import LogIn from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from './pages/Profile';
import Cart from './pages/Cart';




const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
           <Route exact path='/' element={<Home/>}></Route>
           <Route path='/all-Books' element={<AllBooks/>}></Route>
           <Route path='/cart' element={<cart/>}></Route>
           <Route path='/profile' element={<Profile/>}></Route>
           <Route path='/LogIn' element={<LogIn/>}></Route>
           <Route path='/SignUp' element={<SignUp/>}></Route>
        </Routes>
        <Footer /> 
      </Router>
    </div>
  )
}

export default App  