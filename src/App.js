import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Homepage from './pages/Homepage';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
 
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loggedUser = useSelector(state => state.user.loggedUsers);


  useEffect(() => {
    const token = loggedUser?.token || localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // Set to true if token exists
  }, [loggedUser]); 

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />}/>
          <Route path="/homepage" element={<ProtectedRoute> <Homepage /> </ProtectedRoute>} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
