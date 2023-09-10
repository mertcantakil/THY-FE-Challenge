import './App.css';
import FlightSearch from './pages/FlightSearch';
import FlightList from './pages/FlightList';
import Success from './pages/Success';
import Reject from './pages/Reject';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<FlightSearch />} />
          <Route path='/list' element={<FlightList />} />
          <Route path='/success' element={<Success />} />
          <Route path='/reject' element={<Reject />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
