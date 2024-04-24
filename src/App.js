import React from 'react';
import Aboute from './component/Aboute';
import Home from './component/Home';
import Navbar from './component/Navebar'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoteState from './context/NoteState';

import LogIn from './component/LogIn'
import Signin from './component/Signin'
import ThankU from './component/ThankU';

const App = () => {
  return (
    <div>
      <NoteState>
        <Router>fsd
          <Navbar />
          <div className='container my-5'>
            <Routes>
              <Route path="/"  element={<Home />} />
              <Route path="/aboute" element={<Aboute />} />
              <Route  path='/login' element={<LogIn/>}/>
              <Route path='/SignUp' element={<Signin/>}/>
              <Route  path='/thankU' element = {<ThankU/>}/>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
