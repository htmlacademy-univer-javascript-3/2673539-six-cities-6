import { render, fireEvent } from '@testing-library/react';
import SortingOptions from './sorting-options';
import { PlacesOptions } from '../../types/places-options';

const renderSortingOptions = (
  selected: PlacesOptions,
  onChange: (option: PlacesOptions) => void = () => {}
) => render(<SortingOptions selected={selected} onChange={onChange} />);

describe('SortingOptions Component', () => {
  const mockPlacesOptions = [
    PlacesOptions.Popular,
    PlacesOptions.HighToLow,
    PlacesOptions.LowToHigh,
    PlacesOptions.TopRated,
  ];

  test('renders form with correct class', () => {
    const { container } = renderSortingOptions(PlacesOptions.Popular);

    const formElement = container.querySelector('form');
    expect(formElement).toBeInTheDocument();
    expect(formElement).toHaveClass('places__sorting');
  });

  test('renders sorting caption', () => {
    const { getByText } = renderSortingOptions(PlacesOptions.Popular);

    const captionElement = getByText('Sort by');
    expect(captionElement).toBeInTheDocument();
    expect(captionElement).toHaveClass('places__sorting-caption');
  });

  test('renders arrow icon', () => {
    const { container } = renderSortingOptions(PlacesOptions.Popular);

    const arrowSvg = container.querySelector('.places__sorting-arrow');
    expect(arrowSvg).toBeInTheDocument();
    expect(arrowSvg).toHaveAttribute('width', '7');
    expect(arrowSvg).toHaveAttribute('height', '4');
  });

  test('renders all sorting options in list', () => {
    const { container } = renderSortingOptions(PlacesOptions.Popular);

    const optionsList = container.querySelector('.places__options');
    expect(optionsList).toBeInTheDocument();

    const optionElements = container.querySelectorAll('.places__option');
    expect(optionElements).toHaveLength(mockPlacesOptions.length);

    mockPlacesOptions.forEach((option) => {
      const optionElement = container.querySelector(`[data-testid="${option}"]`) ||
        Array.from(optionElements).find((el) => el.textContent === option);
      expect(optionElement).toBeInTheDocument();
    });
  });

  test('options list is closed by default', () => {
    const { container } = renderSortingOptions(PlacesOptions.Popular);

    const optionsList = container.querySelector('.places__options');
    expect(optionsList).not.toHaveClass('places__options--opened');
  });

  test('toggles options list when clicking on selected option', () => {
    const { container } = renderSortingOptions(PlacesOptions.Popular);

    const selectedOption = container.querySelector('.places__sorting-type');
    expect(selectedOption).toBeInTheDocument();

    let optionsList = container.querySelector('.places__options');
    expect(optionsList).not.toHaveClass('places__options--opened');

    fireEvent.click(selectedOption!);

    optionsList = container.querySelector('.places__options');
    expect(optionsList).toHaveClass('places__options--opened');

    fireEvent.click(selectedOption!);

    optionsList = container.querySelector('.places__options');
    expect(optionsList).not.toHaveClass('places__options--opened');
  });

  test('calls onChange with selected option when clicking on option', () => {
    let selectedOptionValue: PlacesOptions | null = null;
    const onChange = (option: PlacesOptions) => {
      selectedOptionValue = option;
    };

    const { container } = renderSortingOptions(PlacesOptions.Popular, onChange);

    const selectedOption = container.querySelector('.places__sorting-type');
    fireEvent.click(selectedOption!);

    const priceHighToLowOption = Array.from(container.querySelectorAll('.places__option'))
      .find((el) => el.textContent === PlacesOptions.HighToLow);
    expect(priceHighToLowOption).toBeInTheDocument();

    fireEvent.click(priceHighToLowOption!);
    expect(selectedOptionValue).toBe(PlacesOptions.HighToLow);
  });

  test('closes options list after selecting an option', () => {
    const { container } = renderSortingOptions(PlacesOptions.Popular);

    const selectedOption = container.querySelector('.places__sorting-type');
    fireEvent.click(selectedOption!);

    let optionsList = container.querySelector('.places__options');
    expect(optionsList).toHaveClass('places__options--opened');

    const firstOption = container.querySelector('.places__option');
    fireEvent.click(firstOption!);

    optionsList = container.querySelector('.places__options');
    expect(optionsList).not.toHaveClass('places__options--opened');
  });

  test('has tabIndex on interactive elements', () => {
    const { container } = renderSortingOptions(PlacesOptions.Popular);

    const selectedOption = container.querySelector('.places__sorting-type');
    expect(selectedOption).toHaveAttribute('tabIndex', '0');

    const listOptions = container.querySelectorAll('.places__option');
    listOptions.forEach((option) => {
      expect(option).toHaveAttribute('tabIndex', '0');
    });
  });

  test('renders all CSS classes correctly', () => {
    const { container } = renderSortingOptions(PlacesOptions.Popular);

    const expectedClasses = [
      'places__sorting',
      'places__sorting-caption',
      'places__sorting-type',
      'places__sorting-arrow',
      'places__options',
      'places__options--custom',
      'places__option',
    ];

    expectedClasses.forEach((className) => {
      const elements = container.getElementsByClassName(className);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  test('matches snapshot with options list closed', () => {
    const { container } = renderSortingOptions(PlacesOptions.Popular);
    expect(container).toMatchSnapshot();
  });

  test('component is memoized', () => {
    const { container } = renderSortingOptions(PlacesOptions.Popular);

    const sortingComponent = container.querySelector('.places__sorting');
    expect(sortingComponent).toBeInTheDocument();
  });
});
