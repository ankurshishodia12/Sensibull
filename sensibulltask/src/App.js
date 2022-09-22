import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";
import './App.css';
import Quotes from './Components/Quotes';
import StockList from './Components/StockList';
const styles = {
  float: 'left',
  color: '#f2f2f2',
  textAlign: 'center',
  padding: '14px 16px',
  textDecoration: 'none',
  fontSize: '17px'
}

function App() {
  return (
    <div className="App">
    <Router>
    <nav style={{backgroundColor: '#333',overflow: 'hidden',marginBottom:'10px'}}>
          <Link   style={styles} to="/stockList">Sensibull</Link>
          {/* <Link   style={styles} to="/quotes">Quot</Link> */}
         
    </nav>
    <Routes>
      <Route path='/stockList' element={<StockList />} />
      <Route path='/quotes' element={<Quotes />} />
      <Route path="/" element={<Navigate replace to="/stockList" />} />
    </Routes>
  </Router>
     
    </div>
  );
}

export default App;
