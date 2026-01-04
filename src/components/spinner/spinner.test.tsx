import { render } from '@testing-library/react';
import { Spinner } from './spinner';

const renderSpinner = () => {
  return render(<Spinner />);
};

describe('Spinner Component', () => {
  test('renders spinner container with correct classes', () => {
    const { container } = renderSpinner();

    const spinnerContainer = container.querySelector('.spinner-container');
    expect(spinnerContainer).toBeInTheDocument();
  });

  test('renders spinner element with correct classes', () => {
    const { container } = renderSpinner();

    const spinnerElement = container.querySelector('.spinner');
    expect(spinnerElement).toBeInTheDocument();
  });

  test('spinner has correct structure with container wrapping spinner', () => {
    const { container } = renderSpinner();

    const spinnerContainer = container.querySelector('.spinner-container');
    const spinnerElement = container.querySelector('.spinner');
    
    expect(spinnerContainer).toBeInTheDocument();
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerContainer?.contains(spinnerElement)).toBe(true);
  });

  test('spinner container has correct styling classes', () => {
    const { container } = renderSpinner();

    const spinnerContainer = container.querySelector('.spinner-container');
    expect(spinnerContainer).toHaveClass('spinner-container');
  });

  test('spinner element has correct styling classes', () => {
    const { container } = renderSpinner();

    const spinnerElement = container.querySelector('.spinner');
    expect(spinnerElement).toHaveClass('spinner');
  });

  test('matches snapshot', () => {
    const { container } = renderSpinner();
    expect(container).toMatchSnapshot();
  });

  test('renders as a functional component', () => {
    const { container } = renderSpinner();
    
    const spinnerContainer = container.querySelector('.spinner-container');
    expect(spinnerContainer).toBeInTheDocument();
    
    const spinnerElement = container.querySelector('.spinner');
    expect(spinnerElement).toBeInTheDocument();
  });

  test('has no interactive elements', () => {
    const { container } = renderSpinner();

    const buttons = container.querySelectorAll('button');
    const links = container.querySelectorAll('a');
    const inputs = container.querySelectorAll('input');
    
    expect(buttons).toHaveLength(0);
    expect(links).toHaveLength(0);
    expect(inputs).toHaveLength(0);
  });
});
