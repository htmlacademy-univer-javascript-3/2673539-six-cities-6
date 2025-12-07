import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { AuthorizationStatus } from '../../const';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';


interface PrivateRouteProps {
  children: JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);
  
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
