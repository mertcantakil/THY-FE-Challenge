import { useState } from 'react';
import '../style.css';
import FlightOptionDetail from './flightOptionDetail';
import { Button, Card, Radio, Row, Switch } from 'antd';
import data from '../../../flights.json';
import { SwapRightOutlined } from '@ant-design/icons';
import {
  BUSINESS, PER_PASSENGER, ECONOMY, FLIGHT_TIME, PROMO_CODE,
  FLIGHT, PASSENGER, DEPATURE_DATE, ECONOMY_AMOUNT, TRY, flightGridStyle,
  priceGridStyle, flightOptionDetailCardsStyle
} from '../../../constants';

const FlightOption = ({ departure, arrival, personCount }) => {

  const { flights } = data;
  const [flightsData, setFlightsData] = useState(flights);
  const [value, setValue] = useState(false);
  const [isPromoActive, setPromoActive] = useState(false);

  const switchHandler = (checked) => {
    setPromoActive(checked);
  };
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const dateSortHandler = () => {
    let sortedData = [...flights].sort((a, b) => (+(a.departureDateTimeDisplay.split(':').join('')) > +(b.departureDateTimeDisplay.split(':')).join('')) ? 1 : -1);
    setFlightsData(sortedData);
  }

  const priceSortHandler = () => {
    let sortedData = [...flights].sort((a, b) => (a.fareCategories.ECONOMY.subcategories[0].price.amount > b.fareCategories.ECONOMY.subcategories[0].price.amount) ? 1 : -1);
    setFlightsData(sortedData);
  }

  const filter = (
    <div>
      <Button className='sort-button' onClick={() => priceSortHandler()}>{ECONOMY_AMOUNT}</Button>
      <Button className='sort-button' onClick={() => dateSortHandler()}>{DEPATURE_DATE}</Button>
    </div>
  );

  return (
    <>
      <div className='list-header'>
        <p className='flight-title'>{FLIGHT}</p>
        <p className='flight-direction-title'>{departure} - {arrival}, {personCount} {PASSENGER}</p>
        <span className='d-flex'>
          <p className='promo-code'>{PROMO_CODE}</p>
          <Switch onChange={switchHandler} />
        </span>
      </div>
      <Card
        className='align-items-center mt-4 w-75'
        title="Sıralama Kriteri"
        extra={filter}
      >
        {
          flightsData.map((flight, index) => {
            return (
              <Row gutter={24}>
                <Card.Grid className='flight-info' hoverable={false} style={flightGridStyle}>
                  <div className='d-flex flex-direction-column'>
                    <span className='bold-gray'>{flight.departureDateTimeDisplay}</span>
                    <span className='city-code'>{flight.originAirport.code}</span>
                    <span className='soft-gray'>{flight.originAirport.city.name}</span>
                  </div>
                  <span><SwapRightOutlined style={{ fontSize: '200%' }} /></span>
                  <div className='d-flex flex-direction-column'>
                    <span className='bold-gray'>{flight.arrivalDateTimeDisplay}</span>
                    <span className='city-code'>{flight.destinationAirport.code}</span>
                    <span className='soft-gray'>{flight.destinationAirport.city.name}</span>
                  </div>
                  <div className='d-flex flex-direction-column justify-content-center'>
                    <span className='soft-gray'>{FLIGHT_TIME}</span>
                    <span className='bold-gray'>{flight.flightDuration}</span>
                  </div>
                </Card.Grid>
                <Card.Grid className='flight-info' hoverable={false} style={priceGridStyle}>
                  <Radio.Group onChange={onChange} value={value}>
                    <Radio value={index + 'Eco'}><b><u>{ECONOMY}</u></b></Radio>
                  </Radio.Group>
                  <div className='d-flex flex-direction-column justify-content-center'>
                    <span className='soft-gray'>{PER_PASSENGER}</span>
                    <span className='bold-gray'>{TRY}
                      {isPromoActive ? flight.fareCategories.ECONOMY.subcategories[0].price.amount / 2 :
                        flight.fareCategories.ECONOMY.subcategories[0].price.amount}
                    </span>
                  </div>
                </Card.Grid>
                <Card.Grid className='flight-info' hoverable={false} style={priceGridStyle}>
                  <Radio.Group onChange={onChange} value={value}>
                    <Radio value={index + 'Bus'}><b><u>{BUSINESS}</u></b></Radio>
                  </Radio.Group>
                  <div className='d-flex flex-direction-column justify-content-center'>
                    <span className='soft-gray'>{PER_PASSENGER}</span>
                    <span className='bold-gray'>{TRY}
                      {isPromoActive ? flight.fareCategories.BUSINESS.subcategories[0].price.amount / 2 :
                        flight.fareCategories.BUSINESS.subcategories[0].price.amount}
                    </span>
                  </div>
                </Card.Grid>
                {value === index + 'Eco' && (
                  <Card.Grid hoverable={false} style={flightOptionDetailCardsStyle}>
                    <FlightOptionDetail
                      subcategories={flight.fareCategories.ECONOMY.subcategories}
                      isPromoActive={isPromoActive}
                    />
                  </Card.Grid>
                )}
                {value === index + 'Bus' && (
                  <Card.Grid hoverable={false} style={flightOptionDetailCardsStyle}>
                    <FlightOptionDetail
                      subcategories={flight.fareCategories.BUSINESS.subcategories}
                      isPromoActive={isPromoActive}
                    />
                  </Card.Grid>
                )}
              </Row>
            )
          })
        }
      </Card>
    </>

  )
}

export default FlightOption;