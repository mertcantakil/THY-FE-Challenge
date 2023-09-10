
import './style.css';
import Header from '../../components/Header/Header';
import { Divider } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';
import { CABIN_SELECTION_COMPLETED, TRY, TOTAL_AMOUNT, successIconStyle } from '../../constants';

const Success = () => {
  let price = localStorage.getItem('ticketPrice');
  return (
    <>
      <Header isDarkTheme={false} />
      <div className='result-page'>
        {
          <div className='message-box'>
            <span className='d-flex justify-content-center align-items-center'>
              <CheckSquareOutlined style={successIconStyle} />
              <h5 className='p-2'>{CABIN_SELECTION_COMPLETED}</h5>
            </span>
            <Divider />
            <div className='total-value-box'>
              <h5>{TOTAL_AMOUNT}</h5>
              <h5 className='total-value'>{TRY} {price}</h5>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default Success;