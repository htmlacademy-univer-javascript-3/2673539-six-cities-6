import { render, screen } from '@testing-library/react';
import EmptyMain from './empty-main';

describe('EmptyMain Component', () => {
  test('renders main container with correct structure', () => {
    const { container } = render(<EmptyMain />);

    // Проверяем основной контейнер
    const citiesContainer = container.querySelector('.cities');
    expect(citiesContainer).toBeInTheDocument();

    // Проверяем внутренний контейнер
    const placesContainer = citiesContainer?.querySelector('.cities__places-container');
    expect(placesContainer).toHaveClass(
      'cities__places-container',
      'cities__places-container--empty',
      'container'
    );
  });

  test('renders no-places section with content', () => {
    render(<EmptyMain />);

    // Проверяем основной текст
    const statusText = screen.getByText('No places to stay available');
    expect(statusText).toBeInTheDocument();
    expect(statusText).toHaveClass('cities__status');
    expect(statusText.tagName).toBe('B');

    // Проверяем описание
    const description = screen.getByText(
      'We could not find any property available at the moment in Dusseldorf'
    );
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('cities__status-description');

    // Проверяем обертку статуса
    const statusWrapper = statusText.parentElement;
    expect(statusWrapper).toHaveClass('cities__status-wrapper', 'tabs__content');

    // Проверяем секцию no-places
    const noPlacesSection = statusWrapper?.parentElement;
    expect(noPlacesSection).toHaveClass('cities__no-places');
  });

  test('renders right section', () => {
    const { container } = render(<EmptyMain />);

    const rightSection = container.querySelector('.cities__right-section');
    expect(rightSection).toBeInTheDocument();
    expect(rightSection).toBeEmptyDOMElement();
  });

  test('has correct hierarchical structure', () => {
    const { container } = render(<EmptyMain />);

    // Проверяем иерархию DOM
    const citiesDiv = container.querySelector('.cities');
    expect(citiesDiv).toBeInTheDocument();

    const placesContainer = citiesDiv?.querySelector('.cities__places-container');
    expect(placesContainer).toBeInTheDocument();

    const section = placesContainer?.querySelector('.cities__no-places');
    expect(section).toBeInTheDocument();

    const statusWrapper = section?.querySelector('.cities__status-wrapper');
    expect(statusWrapper).toBeInTheDocument();

    const boldText = statusWrapper?.querySelector('.cities__status');
    expect(boldText).toBeInTheDocument();

    const paragraph = statusWrapper?.querySelector('.cities__status-description');
    expect(paragraph).toBeInTheDocument();

    const rightSection = placesContainer?.querySelector('.cities__right-section');
    expect(rightSection).toBeInTheDocument();
  });

  test('renders all required CSS classes', () => {
    const { container } = render(<EmptyMain />);

    const expectedClasses = [
      'cities',
      'cities__places-container',
      'cities__places-container--empty',
      'container',
      'cities__no-places',
      'cities__status-wrapper',
      'tabs__content',
      'cities__status',
      'cities__status-description',
      'cities__right-section',
    ];

    expectedClasses.forEach((className) => {
      const element = container.querySelector(`.${className}`);
      expect(element).toBeInTheDocument();
    });
  });

  test('matches snapshot', () => {
    const { container } = render(<EmptyMain />);
    expect(container).toMatchSnapshot();
  });
});
