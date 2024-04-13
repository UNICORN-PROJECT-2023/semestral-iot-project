import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './screens/HomeScreen';
import Register from './screens/RegisterScreen';
import Profile from './screens/ProfileScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Login from './screens/LoginScreen';
import Warehouses from "./screens/WarehousesScreen";
import ArticleDetailScreen from './screens/ArticleDetailScreen';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  function isLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/warehouses" element={<Warehouses/>} />
          <Route path="/login" element={isLoggedIn() ? <Navigate to="/profile" /> : <Login />} />
          <Route path="/register" element={isLoggedIn() ? <Navigate to="/profile" /> : <Register />} />
          <Route path="/profile" element={!isLoggedIn() ? <Navigate to="/login" /> : <Profile />}/>
          <Route path="/Article/:id" element={<ArticleDetailScreen/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
