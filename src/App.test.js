import { render, screen } from '@testing-library/react';
import App from './App';

test('renders StencilCode redesign content', () => {
  render(<App />);
  expect(screen.getByText(/We engineer solutions. Thoughtfully./i)).toBeInTheDocument();
  expect(screen.getByText(/Full-Stack Web Development/i)).toBeInTheDocument();
});
