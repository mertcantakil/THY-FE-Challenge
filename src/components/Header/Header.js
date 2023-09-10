import './Header.css';
import { TURKISH_AIRLINES, SEARCH, FLIGHT_CHALLENGE } from '../../constants';

const Header = ({ isDarkTheme }) => {

  return (
    <>
      <div className={isDarkTheme ? 'white-header' : 'dark-header'}>
        <h4>{TURKISH_AIRLINES}</h4>
        <h4>{SEARCH}<b>{FLIGHT_CHALLENGE}</b></h4>
      </div>
      <hr className={isDarkTheme ? 'white-header-border' : 'dark-header-border'} />
    </>

  )
}
export default Header;