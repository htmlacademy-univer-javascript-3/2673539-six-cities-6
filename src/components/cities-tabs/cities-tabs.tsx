import React from 'react';
import { CitiesEnum } from '../../const';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { changeCity } from '../../store/reducers/city-slice';
import { SixCities } from '../../const';
import { AppDispatch } from '../../store';

const cityList = Object.values(CitiesEnum);

const CitiesTabs: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentCity = useSelector((state: RootState) => state.cityState.city);

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
                <button style={{ border: 'none', cursor: 'pointer', background: `${city === currentCity.name ? '' : 'none'}` }}
                  className={`locations__item-link tabs__item${city === currentCity.name ? ' tabs__item--active' : ''}`}
                  onClick={(e) => e.preventDefault()}
                >
                  <span>{city}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CitiesTabs;
