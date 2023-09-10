import '../style.css';
import { WELCOME_PAGE_FIRST_TITLE, WELCOME_PAGE_SECOND_TITLE } from '../../../constants';

const Welcome = () => {
  return (
    <div className='welcome-section'>
      <h3>{WELCOME_PAGE_FIRST_TITLE}</h3>
      <h4>{WELCOME_PAGE_SECOND_TITLE}</h4>
    </div>
  )
}
export default Welcome;