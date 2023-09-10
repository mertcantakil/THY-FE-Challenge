import { useNavigate } from "react-router-dom";
import Header from '../../components/Header/Header';
import { Divider, Button } from 'antd';
import { CloseSquareOutlined } from '@ant-design/icons';
import './style.css';
import { CABIN_SELECTION_FAILED, TURN_BACK, rejectIconStyle } from '../../constants';

const Reject = () => {

  const navigate = useNavigate();
  localStorage.removeItem('ticketPrice');

  return (
    <>
      <Header isDarkTheme={false} />
      <div className='result-page'>
        <div className='message-box'>
          <span className='d-flex justify-content-center align-items-center'>
            <CloseSquareOutlined style={rejectIconStyle} />
            <h5 className='p-2'>{CABIN_SELECTION_FAILED}</h5>
          </span>
          <Divider />
          <Button
            type='primary'
            danger
            onClick={() => navigate('/')}
          >
            {TURN_BACK}
          </Button>
        </div>
      </div>
    </>
  )
}

export default Reject;