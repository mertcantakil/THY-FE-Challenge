import './style.css';
import Header from '../../components/Header/Header';
import FlightOption from './components/flightOption';

const FlightList = () => {

  const { arrival, departure, personCount } = JSON.parse(localStorage.getItem("selectedData"));

  return (
    <>
      <Header isDarkTheme={false} />
      <div className='list'>
        <FlightOption
          departure={departure}
          arrival={arrival}
          personCount={personCount}
        />
      </div>
    </>
  )
}

export default FlightList;