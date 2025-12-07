import { useState, useMemo } from 'react';
import { PlacesOptions } from '../../types/places-options';
import { OfferCardType } from '../../types/offer';


interface SortingOptionsProps {
  offers: OfferCardType[];
}

const SortingOptions: React.FC<SortingOptionsProps> = ({ offers }) => {
  const [selectedOption, setSelectedOption] = useState<PlacesOptions>(PlacesOptions.Popular);
  const [isSortingOpen, setIsSortingOpen] = useState<boolean>(false);

  const handleOptionClick = (option: PlacesOptions) => {
    setSelectedOption(option);
    setIsSortingOpen(false);
  };

  useMemo(() => {
    switch (selectedOption) {
      case PlacesOptions.LowToHigh:
        return offers.sort((a, b) => a.price - b.price);
      case PlacesOptions.HighToLow:
        return offers.sort((a, b) => b.price - a.price);
      case PlacesOptions.TopRated:
        return offers.sort((a, b) => b.rating - a.rating);
      default:
        return offers;
    }
  }, [offers, selectedOption]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption" style={{ marginRight: '10px' }}>
        Sort by
      </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsSortingOpen((prev) => !prev)}
      >
        {selectedOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul
        className={`places__options places__options--custom ${isSortingOpen ? 'places__options--opened' : ''}`}
      >
        {Object.values(PlacesOptions).map((option) => (
          <li
            key={option}
            className={`places__option ${option === selectedOption ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default SortingOptions;
