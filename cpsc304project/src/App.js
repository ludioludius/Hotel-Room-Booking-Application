import logo from './logo.svg';
import './App.css'
import Home from './pages/Home';
import Post from "./pages/Post"
import Search from "./pages/Search"

import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/home" exact element={<Home/>}/>
          <Route path="/post" exact element={<Post/>}/>
          <Route path="/search" exact element={<Search/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
