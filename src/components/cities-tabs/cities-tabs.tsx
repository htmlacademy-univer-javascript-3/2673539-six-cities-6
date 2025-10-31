import React from 'react';
import { SixCities } from '../../const';

interface CitiesTabsProps {
  CurrentCity: SixCities;
}

const cityList = Object.values(SixCities);

const CitiesTabs: React.FC<CitiesTabsProps> = ({ CurrentCity }) => (
  <div>
    <h1 className="visually-hidden">Cities</h1>
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cityList.map((city) => (
            <li className="locations__item" key={city}>
              <a className={`locations__item-link tabs__item${city === CurrentCity ? ' tabs__item--active' : ''}`} href="#">
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  </div>
);

export default CitiesTabs;
