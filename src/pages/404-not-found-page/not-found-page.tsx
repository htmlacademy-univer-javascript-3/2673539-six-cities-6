import './not-found-page.css';
import {Helmet} from 'react-helmet-async';
import {AppRoute} from '../../const.ts';
import {Link} from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-container">
      <Helmet>
        <title>Not Found - 6 cities</title>
      </Helmet>

      <div className="not-found-title">404</div>
      <div className="not-found-text">Страница не найдена</div>

      <Link to={AppRoute.Root} className="button-link">
        Вернуться на главную страницу
      </Link>
    </div>
  );
};

export default NotFoundPage;