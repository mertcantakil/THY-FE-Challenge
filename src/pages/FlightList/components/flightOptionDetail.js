import '../style.css';
import { Button, Card, List, Typography } from 'antd';
import { useNavigate } from "react-router-dom";
import { SELECT_FLIGHT, innerCardStyle } from '../../../constants';

const FlightOptionDetail = ({ subcategories, isPromoActive }) => {

  const navigate = useNavigate();
  const ecoFlyListOptions = subcategories.find(subcategory => subcategory.brandCode === 'ecoFly').rights;
  const extraFlyListOptions = subcategories.find(subcategory => subcategory.brandCode === 'extraFly').rights;
  const primeFlyListOptions = subcategories.find(subcategory => subcategory.brandCode === 'primeFly').rights;
  const disabledFooter = <Button disabled> {SELECT_FLIGHT} </Button>
  const listSuccessFooter = price => <Button onClick={() => buttonOnClick(isPromoActive ? price / 2 : price, '/success')}> {SELECT_FLIGHT} </Button>;
  const listRejectFooter = price => <Button onClick={() => buttonOnClick(isPromoActive ? price / 2 : price, '/reject')}> {SELECT_FLIGHT} </Button>;

  const listHeader = (title, price, currency) => (
    <div className='flight-detail-list-title'>
      <h5>{title}</h5>
      <h5>{currency} {isPromoActive ? price / 2 : price}</h5>
    </div>
  );

  const buttonOnClick = (value, path) => {
    localStorage.setItem('ticketPrice', value);
    navigate(path);
  }

  return (
    <Card className='inner-card'>
      {
        subcategories.map(subcategory => {
          return (
            <Card.Grid
              hoverable={false}
              style={innerCardStyle}
              className='inner-card-grid'
            >
              <List
                header={listHeader(subcategory.brandCode, subcategory.price.amount, subcategory.price.currency)}
                footer={
                  subcategory.brandCode === 'ecoFly' ? (subcategory.status === 'AVAILABLE' ? listSuccessFooter(subcategory.price.amount) : listRejectFooter(subcategory.price.amount)) :
                    (isPromoActive ? disabledFooter : (subcategory.status === 'AVAILABLE' ? listSuccessFooter(subcategory.price.amount) : listRejectFooter(subcategory.price.amount)))
                }
                bordered
                dataSource={subcategory.brandCode === 'ecoFly' ? ecoFlyListOptions : (subcategory.brandCode === 'extraFly' ? extraFlyListOptions : primeFlyListOptions)}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text mark></Typography.Text> {item}
                  </List.Item>
                )}
              />
            </Card.Grid>
          )
        })
      }
    </Card>
  )
}

export default FlightOptionDetail;