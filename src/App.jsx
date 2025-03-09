import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Login from './components/Login';
import CardList from './components/CardList';
import Details from './components/Details';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cardlist" element={<CardList />} />
        <Route path="/details/:IdProducto" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;