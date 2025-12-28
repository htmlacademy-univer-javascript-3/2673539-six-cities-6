import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { PropsWithChildren } from 'react';

function PrivateRoute({ children }: PropsWithChildren): JSX.Element {
  const authorizationStatus = useSelector((state: RootState) => state.userState.authorizationStatus);

  return authorizationStatus === AuthorizationStatus.Auth
    ? <div>{children}</div>
    : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
