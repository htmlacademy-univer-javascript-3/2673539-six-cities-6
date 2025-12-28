import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/header/header';
import { AppDispatch, RootState } from '../../store';
import { loginAction } from '../../store/api-actions';
import { useSelector, useDispatch } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { useNavigate } from 'react-router-dom';
import { SixCities } from '../../const';
import { Link } from 'react-router-dom';
import { changeCity } from '../../store/reducers/city-slice';


const Login: React.FC = () => {
  const randomCity = useMemo(() => {
    const cities = Object.values(SixCities);
    return cities[Math.floor(Math.random() * cities.length)];
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const authorizationStatus = useSelector((state: RootState) => state.userState.authorizationStatus);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    }
    if (!re.test(email)) {
      return 'Invalid email format';
    }
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one digit';
    }
    return '';
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault(); //

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) {
      return;
    }

    dispatch(loginAction({ email, password }));
  };

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate('/');
    }
  }, [authorizationStatus, navigate]);

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit} noValidate>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <p className="form__error">{emailError}</p>}
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <p className="form__error">{passwordError}</p>}
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/" onClick={() => dispatch(changeCity(randomCity))}>
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default Login;
