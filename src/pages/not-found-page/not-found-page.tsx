import { Link } from 'react-router-dom';
import './not-found-page-styles.css';
import {Helmet} from 'react-helmet-async';

function NotFoundPage() {
  return (
    <div className="not-found-container">
      <Helmet>
        <title>Not Found - 6 cities</title>
      </Helmet>
      <h1>404 Page Not Found</h1>
      <Link to="/" className="button-link">
        Вернуться на главную страницу
      </Link>
    </div>
  );
}

export default NotFoundPage;
