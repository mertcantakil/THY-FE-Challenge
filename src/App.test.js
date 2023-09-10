import { render, screen } from '@testing-library/react';
import Welcome from './pages/FlightSearch/components/welcome';
import Header from './components/Header/Header';

test('Flight search page should render correctly', () => {
  render(<Welcome />);
  const title = screen.getByText(/Merhaba/i);
  expect(title).toBeInTheDocument();
});
test('Header should render correctly', () => {
  render(<Header />);
  const title = screen.getByText(/turkishairlines.com/i);
  expect(title).toBeInTheDocument();
});
