import React from 'react';

import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import ProtectRoutes from './ProtectRoutes';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route element={<ProtectRoutes/>}>
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About/>} />
        </Route>
        <Route path='*' element={<div>Error</div>}/>
      </Routes>
    </div>
  );
}

export default App;
