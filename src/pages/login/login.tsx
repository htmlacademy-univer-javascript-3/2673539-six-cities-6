import React, { useState, useEffect } from 'react';
import Header from '../../components/header/header';
import { AppDispatch } from '../../store';
import { loginAction } from '../../store/actions/api-actions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { AuthorizationStatus } from '../../const';
import { useNavigate } from 'react-router-dom';



const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault(); // забыл зачем это...

    if (!email || !password) {
      return;
    }

    dispatch(loginAction({ email, password }));
  };

  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);


  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate('/');
    }
    else {
      navigate('/login');
    }
  }, [authorizationStatus]);

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
export default Login;
