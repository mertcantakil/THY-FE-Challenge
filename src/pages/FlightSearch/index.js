import './style.css';
import Welcome from './components/welcome';
import FlightSelectionArea from './components/flightSelectionArea';
import Header from '../../components/Header/Header';
import data from '../../flights.json';

const FlightSearch = () => {

  const { flights } = data;

  return (
    <>
      <Header isDarkTheme={true} />
      <div className='flight-search'>
        <Welcome />
        <FlightSelectionArea flights={flights} />
      </div>
    </>
  )
}

export default FlightSearch;