import logo from './logo.svg';
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Services from "./pages/Services"

import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/home" exact element={<Home/>}/>
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/services" exact element={<Services/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
