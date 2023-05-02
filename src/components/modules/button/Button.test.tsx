import { render, screen } from '@testing-library/react';
import Button from './Button';

// Unit test basic example

describe('Button', () => {
  test('renders correctly', () => {
    render(<Button text="submit" />);
    const textElement = screen.getByText(/submit/i);
    expect(textElement).toBeInTheDocument();
  });
});
