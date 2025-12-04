import React from 'react';
import { CitiesEnum } from '../../const';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { changeCity } from '../../store/actions/action';
import { SixCities } from '../../const';

const cityList = Object.values(CitiesEnum);

const CitiesTabs: React.FC = () => {
  const dispatch = useDispatch();
  const currentCity = useSelector((state: RootState) => state.city);

  const handleCityClick = (cityName: CitiesEnum) => {
    const newCity = SixCities.find((city) => city.name === cityName);
    dispatch(changeCity(newCity!));
  };

  return (
    <div>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cityList.map((city) => (
              <li
                className="locations__item"
                key={city}
                onClick={() => handleCityClick(city)}
              >
                <a
                  className={`locations__item-link tabs__item${
                    city === currentCity.name ? ' tabs__item--active' : ''
                  }`}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  <span>{city}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CitiesTabs;
