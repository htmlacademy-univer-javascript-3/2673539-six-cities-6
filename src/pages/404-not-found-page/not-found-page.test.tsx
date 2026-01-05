import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NotFoundPage from './not-found-page';
import { AppRoute } from '../../const';

const renderNotFoundPage = () => render(
  <HelmetProvider>
    <BrowserRouter>
      <NotFoundPage />
    </BrowserRouter>
  </HelmetProvider>
);

describe('NotFoundPage Component', () => {
  test('renders not found container with correct class', () => {
    const { container } = renderNotFoundPage();

    const containerElement = container.querySelector('.not-found-container');
    expect(containerElement).toBeInTheDocument();
  });

  test('renders 404 title', () => {
    const { container } = renderNotFoundPage();

    const titleElement = container.querySelector('.not-found-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement?.textContent).toBe('404');
  });

  test('renders not found text', () => {
    const { container } = renderNotFoundPage();

    const textElement = container.querySelector('.not-found-text');
    expect(textElement).toBeInTheDocument();
    expect(textElement?.textContent).toBe('Страница не найдена');
  });

  test('renders link to home page', () => {
    const { container } = renderNotFoundPage();

    const linkElement = container.querySelector('a.button-link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', AppRoute.Root);
    expect(linkElement?.textContent).toBe('Вернуться на главную страницу');
  });

  test('link has correct class', () => {
    const { container } = renderNotFoundPage();

    const linkElement = container.querySelector('a');
    expect(linkElement).toHaveClass('button-link');
  });

  test('contains all required elements', () => {
    const { container } = renderNotFoundPage();

    const elements = [
      '.not-found-container',
      '.not-found-title',
      '.not-found-text',
      '.button-link',
    ];

    elements.forEach((selector) => {
      const element = container.querySelector(selector);
      expect(element).toBeInTheDocument();
    });
  });

  test('has correct structure with div container', () => {
    const { container } = renderNotFoundPage();

    const containerDiv = container.querySelector('.not-found-container');
    expect(containerDiv?.children.length).toBeGreaterThan(0);
  });

  test('matches snapshot', () => {
    const { container } = renderNotFoundPage();
    expect(container).toMatchSnapshot();
  });

  test('link navigates to correct route', () => {
    const { container } = renderNotFoundPage();

    const linkElement = container.querySelector('a');
    expect(linkElement).toHaveAttribute('href', '/');
  });

  test('renders without errors', () => {
    const { container } = renderNotFoundPage();

    expect(container.querySelector('.not-found-container')).toBeInTheDocument();
  });
});
