import React, { useState, useCallback } from 'react';
import { PlacesOptions } from '../../types/places-options';

interface SortingOptionsProps {
  selected: PlacesOptions;
  onChange: (option: PlacesOptions) => void;
}

const SortingOptions: React.FC<SortingOptionsProps> = React.memo(({ selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(
    (option: PlacesOptions) => {
      onChange(option);
      setIsOpen(false);
    },
    [onChange]
  );

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>

      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {Object.values(PlacesOptions).map((option) => (
          <li
            key={option}
            className={`places__option ${option === selected ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
});

export default SortingOptions;
