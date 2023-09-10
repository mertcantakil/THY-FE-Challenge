import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import { Button, Select, Space, DatePicker, Popover, Radio, notification } from 'antd';
import { RiseOutlined, FallOutlined, UserOutlined, RightOutlined } from '@ant-design/icons';
import { suffixIconStyle, buttonStyle, ERROR_MSG, ERROR, DEFAULT_DATE, CABIN_AND_PASSENGER_SELECTION, FROM, TO, DATE } from '../../../constants';

const FlightSelectionArea = ({ flights }) => {

  let [count, setCount] = useState(0);
  let [departure, setDeparture] = useState('');
  let [arrival, setArrival] = useState('');
  let [isAcceptableRoute, setAcceptableRoute] = useState(false);
  const [radioValue, setRadioValue] = useState('Economy');
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: ERROR,
      description: ERROR_MSG,
    });
  };

  const depatureHandler = (value) => setDeparture(value);
  const arrivalHandler = (value) => setArrival(value);
  const onChangeRadio = (e) => setRadioValue(e.target.value);

  const incrementCount = () => {
    count = count + 1;
    setCount(count);
  }

  const decrementCount = () => {
    if (count <= 0) {
      count = 0;
      setCount(count);
    }
    else {
      count = count - 1;
      setCount(count);
    }
  }

  const removeDuplicatesOptions = (arr) => {
    const uniqueArr = arr.filter((obj, index) => {
      return index === arr.findIndex(o => obj.value === o.value);
    });
    return uniqueArr;
  }

  const getDepartureOptions = () => {
    let options = [];
    flights.forEach(({ originAirport }) => {
      options.push({
        value: originAirport.name,
        label: originAirport.name,
      });
    });

    //when click the below option the page should be given an error
    options.push({
      label: 'Adnan Menderes Airport',
      value: 'Adnan Menderes Airport',
    })

    return removeDuplicatesOptions(options);
  };

  const getArrivalOptions = () => {
    let options = [];
    flights.forEach(({ destinationAirport }) => {
      options.push({
        value: destinationAirport.name,
        label: destinationAirport.name,
      });
    });

    //when click the below option the page should be given an error
    options.push({
      label: 'Esenboga Airport',
      value: 'Esenboga Airport',
    })

    return removeDuplicatesOptions(options);
  };

  useEffect(() => {
    let selectedData = {
      personCount: count,
      departure,
      arrival,
    }
    localStorage.setItem("selectedData", JSON.stringify(selectedData));
  }, [arrival, count, departure, radioValue]);

  useEffect(() => {
    let isDepartureExist = flights.find(flight => flight.originAirport.name === departure);
    let isArrivalExist = flights.find(flight => flight.destinationAirport.name === arrival);
    if (isDepartureExist && isArrivalExist) setAcceptableRoute(true);
    else setAcceptableRoute(false);
  }, [arrival, departure, flights]);

  const personCountDetailContent = (
    <div>
      <Radio.Group onChange={onChangeRadio} value={radioValue} className='eco-bus-radio-buttons'>
        <Radio value={'Economy'}>Economy Class</Radio>
        <Radio value={'Business'}>Business Class</Radio>
      </Radio.Group>
      <div className='set-person-count'>
        <p>Yolcu</p>
        <div className='d-flex'>
          <Button onClick={decrementCount}>-</Button>
          <p className='m-1'>{count}</p>
          <Button onClick={incrementCount}>+</Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className='flight-selection-area'>
      <div className="d-flex p-4">
        <Space wrap>
          <Select
            className='depatureSelectBox'
            placeholder={FROM}
            suffixIcon={<RiseOutlined style={suffixIconStyle} />}
            style={{ width: 200 }}
            size='large'
            onChange={depatureHandler}
            options={getDepartureOptions()}
          />
          <Select
            className='arrivalSelectBox'
            placeholder={TO}
            suffixIcon={<FallOutlined style={suffixIconStyle} />}
            style={{ width: 200 }}
            size='large'
            onChange={arrivalHandler}
            options={getArrivalOptions()}
          />
          <DatePicker
            defaultValue={dayjs(DEFAULT_DATE)}
            className='datePicker'
            size='large'
            placeholder={DATE}
          />
          <Popover content={personCountDetailContent} title={CABIN_AND_PASSENGER_SELECTION} trigger="click" placement="bottom">
            <Button className='personBtn'><UserOutlined style={suffixIconStyle} /><p><b>{count}</b></p></Button>
          </Popover>
        </Space>
        {contextHolder}
        <Button
          className='select-ticket-btn'
          size='large'
          onClick={() => isAcceptableRoute ? navigate('list') : openNotificationWithIcon('error')}
        >
          <RightOutlined style={buttonStyle} />
        </Button>
      </div>
    </div>
  )
}

export default FlightSelectionArea;