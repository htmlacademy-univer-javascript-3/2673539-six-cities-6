import { render, screen } from '@testing-library/react';
import EmptyFavorites from './empty-favorites';

describe('EmptyFavorites Component', () => {
  test('renders empty favorites section with correct structure', () => {
    render(<EmptyFavorites />);

    // Проверяем наличие основных контейнеров
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('page__main', 'page__main--favorites', 'page__main--favorites-empty');

    const container = mainElement.querySelector('.page__favorites-container');
    expect(container).toHaveClass('page__favorites-container', 'container');

    const favoritesSection = container?.querySelector('.favorites--empty');
    expect(favoritesSection).toHaveClass('favorites', 'favorites--empty');
  });

  test('renders hidden heading for accessibility', () => {
    render(<EmptyFavorites />);

    const heading = screen.getByText('Favorites (empty)');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('visually-hidden');
  });

  test('renders empty state message', () => {
    render(<EmptyFavorites />);

    // Проверяем основной текст
    const statusText = screen.getByText('Nothing yet saved.');
    expect(statusText).toBeInTheDocument();
    expect(statusText).toHaveClass('favorites__status');
    expect(statusText.tagName).toBe('B');

    // Проверяем описание
    const description = screen.getByText(
      'Save properties to narrow down search or plan your future trips.'
    );
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('favorites__status-description');

    // Проверяем обертку
    const statusWrapper = statusText.parentElement;
    expect(statusWrapper).toHaveClass('favorites__status-wrapper');
  });

  test('renders all required elements with correct classes', () => {
    render(<EmptyFavorites />);

    const elements = [
      '.page__main--favorites-empty',
      '.page__favorites-container',
      '.favorites--empty',
      '.favorites__status-wrapper',
      '.favorites__status',
      '.favorites__status-description'
    ];

    elements.forEach((selector) => {
      const element = document.querySelector(selector);
      expect(element).toBeInTheDocument();
    });
  });

  test('has correct semantic structure', () => {
    const { container } = render(<EmptyFavorites />);

    // Проверяем структуру DOM
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();

    const divContainer = main?.querySelector('.page__favorites-container');
    expect(divContainer).toBeInTheDocument();

    const section = divContainer?.querySelector('section');
    expect(section).toBeInTheDocument();

    const h1 = section?.querySelector('h1');
    expect(h1).toBeInTheDocument();

    const wrapper = section?.querySelector('.favorites__status-wrapper');
    expect(wrapper).toBeInTheDocument();

    const boldText = wrapper?.querySelector('b');
    expect(boldText).toBeInTheDocument();

    const paragraph = wrapper?.querySelector('p');
    expect(paragraph).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { container } = render(<EmptyFavorites />);
    expect(container).toMatchSnapshot();
  });
});
