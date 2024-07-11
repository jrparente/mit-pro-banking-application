import { render, screen } from '@testing-library/react';
import App from './App';

test("navigates to create account page", () => {
  render(<App />);
  const linkElement = screen.getAllByRole("link", { name: /create account/i });
  expect(linkElement).toHaveLength(3)
});
