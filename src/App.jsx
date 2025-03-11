import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import CardList from './components/CardList';
import Details from './components/Details';
import 'bootstrap/dist/css/bootstrap.min.css';

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