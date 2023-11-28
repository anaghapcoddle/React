import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText }: RenderResult = render(<App />);
  const linkElement: HTMLElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
