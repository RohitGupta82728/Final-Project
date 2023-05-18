import React from 'react';

import './App.css';
import SignUp from './views/auth/SignUp';
import SignIn from './views/auth/SignIn';
import PageNotFound from './views/PageNotFound';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SideNav from './components/dashboard/SideNav';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
// import {  } from './reducers/authReducer';


function App() {
 const isLoggedIn = useSelector((state: RootState) =>state.user.isLoggedIn);
 

  return (
    <div className="App">
     <>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp/>} />
          <Route path='signin' element={<SignIn />}/>
          <Route  path='dashboard' element={<SideNav/>}/>
          <Route path='*' element={<PageNotFound />}/>
        </Routes>
      </BrowserRouter>
     </>
    </div>
  );
}

export default App;
