import React,{useContext,useEffect} from 'react';
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import ProtectRoutes from './ProtectRoutes';
import Register from './pages/Register';
import {AuthContext} from './auth/AuthContext';
import WithHeader from './components/WithHeader';

function App() {


  const currentUser = useContext(AuthContext);

  

  return (
    <div className="App">
      <Routes>
        { currentUser?.currentUser!==null ? <Route path='/' element={<WithHeader><Home /></WithHeader>} /> : <Route path='/' element={<SignIn />} />}
        <Route path='register' element={<Register/>}/>
        <Route element={<ProtectRoutes/>}>
        <Route path='/about' element={<About/>} />
        </Route>
        <Route path='*' element={<div>Error</div>}/>
      </Routes>
    </div>
  );
}

export default App;
