import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import Login from './login';
import { RootState } from '../../store';
import { AuthorizationStatus } from '../../const';

type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;

const middlewares = [thunk];
const mockStore = configureStore<RootState, DispatchExts>(middlewares);

const renderLogin = (authStatus = AuthorizationStatus.NoAuth) => {
  const store = mockStore({
    userState: {
      authorizationStatus: authStatus,
    },
    cityState: {
      city: {
        name: 'Paris',
        location: {
          latitude: 48.8566,
          longitude: 2.3522,
          zoom: 13,
        },
      },
    },
  } as unknown as RootState);

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
};

describe('Login Component', () => {
  test('renders page with correct classes', () => {
    const { container } = renderLogin();

    const pageContainer = container.querySelector('.page');
    expect(pageContainer).toBeInTheDocument();
    expect(pageContainer).toHaveClass('page--gray', 'page--login');
  });

  test('renders Header component', () => {
    const { container } = renderLogin();

    const headerElement = container.querySelector('header');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass('header');
  });

  test('renders main section with correct classes', () => {
    const { container } = renderLogin();

    const mainElement = container.querySelector('.page__main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass('page__main--login');
  });

  test('renders login container', () => {
    const { container } = renderLogin();

    const loginContainer = container.querySelector('.page__login-container');
    expect(loginContainer).toBeInTheDocument();
    expect(loginContainer).toHaveClass('container');
  });

  test('renders login title', () => {
    const { container } = renderLogin();

    const titleElement = container.querySelector('.login__title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement?.textContent).toBe('Sign in');
  });

  test('renders login form', () => {
    const { container } = renderLogin();

    const formElement = container.querySelector('.login__form');
    expect(formElement).toBeInTheDocument();
    expect(formElement).toHaveClass('form');
  });

  test('renders email input field', () => {
    const { container } = renderLogin();

    const emailInput = container.querySelector('input[name="email"]');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveClass('login__input', 'form__input');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('placeholder', 'Email');
  });

  test('renders password input field', () => {
    const { container } = renderLogin();

    const passwordInput = container.querySelector('input[name="password"]');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveClass('login__input', 'form__input');
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('placeholder', 'Password');
  });

  test('renders submit button', () => {
    const { container } = renderLogin();

    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveClass('login__submit', 'form__submit', 'button');
    expect(submitButton?.textContent).toBe('Sign in');
  });

  test('renders random city link', () => {
    const { container } = renderLogin();

    const locationsSection = container.querySelector('.locations--login');
    expect(locationsSection).toBeInTheDocument();
    expect(locationsSection).toHaveClass('locations--current');

    const cityLink = container.querySelector('.locations__item-link');
    expect(cityLink).toBeInTheDocument();
    expect(cityLink).toHaveAttribute('href', '/');
  });

  test('email input updates on change', () => {
    const { container } = renderLogin();

    const emailInput = container.querySelector('input[name="email"]') as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput.value).toBe('test@example.com');
  });

  test('password input updates on change', () => {
    const { container } = renderLogin();

    const passwordInput = container.querySelector('input[name="password"]') as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput.value).toBe('password123');
  });

  test('form has noValidate attribute', () => {
    const { container } = renderLogin();

    const formElement = container.querySelector('.login__form');
    expect(formElement).toHaveAttribute('noValidate');
  });

  test('renders input wrappers with correct classes', () => {
    const { container } = renderLogin();

    const inputWrappers = container.querySelectorAll('.login__input-wrapper');
    expect(inputWrappers).toHaveLength(2);

    inputWrappers.forEach((wrapper) => {
      expect(wrapper).toHaveClass('form__input-wrapper');
    });
  });

  test('renders labels as visually hidden', () => {
    const { container } = renderLogin();

    const labels = container.querySelectorAll('.visually-hidden');
    expect(labels.length).toBeGreaterThanOrEqual(2);
  });

  test('city link contains random city name', () => {
    const { container } = renderLogin();

    const citySpan = container.querySelector('.locations__item-link span');
    expect(citySpan).toBeInTheDocument();
    expect(citySpan?.textContent).toBeTruthy();
  });

  test('renders all required CSS classes', () => {
    const { container } = renderLogin();

    const expectedClasses = [
      'page',
      'page--gray',
      'page--login',
      'header',
      'page__main',
      'page__main--login',
      'page__login-container',
      'container',
      'login',
      'login__title',
      'login__form',
      'form',
      'login__input-wrapper',
      'form__input-wrapper',
      'login__input',
      'form__input',
      'login__submit',
      'form__submit',
      'button',
      'locations',
      'locations--login',
      'locations--current',
      'locations__item',
      'locations__item-link',
      'visually-hidden',
    ];

    expectedClasses.forEach((className) => {
      const elements = container.getElementsByClassName(className);
      expect(elements.length).toBeGreaterThan(0);
    });
  });
});
