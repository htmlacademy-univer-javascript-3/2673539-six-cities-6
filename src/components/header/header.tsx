import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { AuthorizationStatus } from '../../const';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAction } from '../../store/actions/api-actions';
import { AppDispatch } from '../../store';

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);
  const userData = useSelector((state: RootState) => state.userData);
  const favoriteOffers = useSelector((state: RootState) => state.favoriteOffers);

  const handleSignOut = async () => {
    await dispatch(logoutAction());
    navigate('/');
  };

  const handleUserClick = () => {
    navigate('/favorites');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">

              {authorizationStatus === AuthorizationStatus.Auth && userData ? (
                <>
                  <li
                    className="header__nav-item user"
                    onClick={handleUserClick}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">{userData.email}</span>
                      <span className="header__favorite-count">{favoriteOffers.length}</span>
                    </div>
                  </li>

                  <li className="header__nav-item" onClick={handleSignOut} style={{ cursor: 'pointer' }}>
                    <span className="header__nav-link">
                      <span className="header__signout">Sign out</span>
                    </span>
                  </li>
                </>
              ) : (
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/login">
                    <span className="header__signout">Sign in</span>
                  </Link>
                </li>
              )}

            </ul>
          </nav>

        </div>
      </div>
    </header>
  );
};

export default Header;