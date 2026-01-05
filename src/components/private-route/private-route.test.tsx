import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './private-route';
import { RootState } from '../../store';
import { AuthorizationStatus } from '../../const';

type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;

const middlewares = [thunk];
const mockStore = configureStore<RootState, DispatchExts>(middlewares);

const renderPrivateRoute = (authorizationStatus: AuthorizationStatus, initialRoute = '/') => {
  const store = mockStore({
    userState: { authorizationStatus },
  } as unknown as RootState);

  const TestComponent = () => <div data-testid="protected-content">Protected Content</div>;

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/login" element={<div data-testid="login-page">Login Page</div>} />
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <TestComponent />
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('PrivateRoute Component', () => {
  test('renders children when user is authorized', () => {
    const { getByTestId } = renderPrivateRoute(AuthorizationStatus.Auth, '/protected');

    const protectedContent = getByTestId('protected-content');
    expect(protectedContent).toBeInTheDocument();
    expect(protectedContent.textContent).toBe('Protected Content');
  });

  test('redirects to login page when user is not authorized', () => {
    const { getByTestId } = renderPrivateRoute(AuthorizationStatus.NoAuth, '/protected');

    const loginPage = getByTestId('login-page');
    expect(loginPage).toBeInTheDocument();
    expect(loginPage.textContent).toBe('Login Page');
  });

  test('does not show protected content when not authorized', () => {
    const { queryByTestId } = renderPrivateRoute(AuthorizationStatus.NoAuth, '/protected');

    const protectedContent = queryByTestId('protected-content');
    expect(protectedContent).not.toBeInTheDocument();
  });

  test('wraps children in div when authorized', () => {
    const { container } = renderPrivateRoute(AuthorizationStatus.Auth, '/protected');

    const wrapperDiv = container.querySelector('div');
    expect(wrapperDiv).toBeInTheDocument();
    expect(wrapperDiv?.children).toHaveLength(1);

    const protectedContent = container.querySelector('[data-testid="protected-content"]');
    expect(protectedContent).toBeInTheDocument();
    expect(protectedContent?.parentElement).toBe(wrapperDiv);
  });

  test('matches snapshot when authorized', () => {
    const { container } = renderPrivateRoute(AuthorizationStatus.Auth, '/protected');
    expect(container).toMatchSnapshot();
  });

  test('matches snapshot when not authorized', () => {
    const { container } = renderPrivateRoute(AuthorizationStatus.NoAuth, '/protected');
    expect(container).toMatchSnapshot();
  });

  test('uses correct redirect route to login', () => {
    const { getByTestId } = renderPrivateRoute(AuthorizationStatus.NoAuth, '/protected');

    const loginPage = getByTestId('login-page');
    expect(loginPage).toBeInTheDocument();
  });

  test('renders correctly with BrowserRouter', () => {
    const store = mockStore({
      userState: { authorizationStatus: AuthorizationStatus.Auth },
    } as unknown as RootState);

    const TestComponent = () => <div data-testid="test-content">Test</div>;

    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <PrivateRoute>
            <TestComponent />
          </PrivateRoute>
        </BrowserRouter>
      </Provider>
    );

    const content = getByTestId('test-content');
    expect(content).toBeInTheDocument();
    expect(content.textContent).toBe('Test');
  });
});
