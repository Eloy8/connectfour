import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Renders Connect four!', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Connect four!/i);
  expect(linkElement).toBeInTheDocument();
});
