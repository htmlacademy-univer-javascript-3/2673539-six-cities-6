import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './footer';

describe('Footer Component', () => {
  const renderFooter = () => render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );

  test('renders footer container with correct class', () => {
    renderFooter();

    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveClass('footer', 'container');
  });

  test('renders logo link that navigates to home page', () => {
    renderFooter();

    const logoLink = screen.getByRole('link', { name: /6 cities logo/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveClass('footer__logo-link');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  test('renders logo image with correct attributes', () => {
    renderFooter();

    const logoImage = screen.getByAltText('6 cities logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveClass('footer__logo');
    expect(logoImage).toHaveAttribute('src', 'img/logo.svg');
    expect(logoImage).toHaveAttribute('width', '64');
    expect(logoImage).toHaveAttribute('height', '33');
  });

  test('logo link contains the logo image', () => {
    renderFooter();

    const logoLink = screen.getByRole('link', { name: /6 cities logo/i });
    const logoImage = screen.getByAltText('6 cities logo');
    expect(logoLink).toContainElement(logoImage);
    expect(logoImage.parentElement).toBe(logoLink);
  });

  test('renders semantic footer element', () => {
    const { container } = renderFooter();

    const footerTag = container.querySelector('footer');
    expect(footerTag).toBeInTheDocument();
    expect(footerTag?.tagName).toBe('FOOTER');
  });

  test('matches snapshot', () => {
    const { container } = renderFooter();
    expect(container).toMatchSnapshot();
  });

  test('has correct accessibility attributes', () => {
    renderFooter();

    const logoImage = screen.getByAltText('6 cities logo');
    expect(logoImage).toHaveAccessibleName('6 cities logo');
    expect(logoImage.getAttribute('alt')).toBe('6 cities logo');
    const logoLink = screen.getByRole('link');
    expect(logoLink).toHaveAccessibleName('6 cities logo');
  });
});
