import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import YourReviewForm from './your-review-form';
import { RootState } from '../../store';

type DispatchExts = ThunkDispatch<RootState, void, AnyAction>;

const middlewares = [thunk];
const mockStore = configureStore<RootState, DispatchExts>(middlewares);

const renderYourReviewForm = () => {
  const store = mockStore({
    userState: { authorizationStatus: 'AUTH' },
  } as unknown as RootState);

  return render(
    <Provider store={store}>
      <YourReviewForm offerId="test-offer-123" />
    </Provider>
  );
};

describe('YourReviewForm Component', () => {
  test('renders form with correct classes', () => {
    const { container } = renderYourReviewForm();

    const formElement = container.querySelector('.reviews__form');
    expect(formElement).toBeInTheDocument();
    expect(formElement).toHaveClass('form');
  });

  test('renders label for review textarea', () => {
    const { container } = renderYourReviewForm();

    const labelElement = container.querySelector('.reviews__label');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass('form__label');
    expect(labelElement).toHaveAttribute('for', 'review');
    expect(labelElement?.textContent).toBe('Your review');
  });

  test('renders rating stars from 5 to 1', () => {
    const { container } = renderYourReviewForm();

    const ratingInputs = container.querySelectorAll('input[name="rating"]');
    expect(ratingInputs).toHaveLength(5);

    const stars = [5, 4, 3, 2, 1];
    stars.forEach((star, index) => {
      expect(ratingInputs[index]).toHaveAttribute('value', star.toString());
      expect(ratingInputs[index]).toHaveAttribute('id', `${star}-stars`);
    });
  });

  test('renders textarea with correct attributes', () => {
    const { container } = renderYourReviewForm();

    const textareaElement = container.querySelector('textarea');
    expect(textareaElement).toBeInTheDocument();
    expect(textareaElement).toHaveClass('reviews__textarea', 'form__textarea');
    expect(textareaElement).toHaveAttribute('id', 'review');
    expect(textareaElement).toHaveAttribute('name', 'review');
    expect(textareaElement).toHaveAttribute('placeholder', 'Tell how was your stay, what you like and what can be improved');
  });

  test('renders submit button with correct text', () => {
    const { container } = renderYourReviewForm();

    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveClass('reviews__submit', 'form__submit', 'button');
    expect(submitButton?.textContent).toBe('Submit');
  });

  test('submit button is disabled by default', () => {
    const { container } = renderYourReviewForm();

    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).toBeDisabled();
  });

  test('submit button becomes enabled with rating and sufficient text', () => {
    const { container } = renderYourReviewForm();

    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).toBeDisabled();

    const ratingInput = container.querySelector('input[value="5"]');
    fireEvent.click(ratingInput!);
    
    const textareaElement = container.querySelector('textarea');
    fireEvent.change(textareaElement!, { target: { value: 'This is a great place! I really enjoyed my stay here. The service was excellent and the location was perfect.' } });

    expect(submitButton).not.toBeDisabled();
  });

  test('submit button remains disabled with rating but insufficient text', () => {
    const { container } = renderYourReviewForm();

    const submitButton = container.querySelector('button[type="submit"]');
    
    const ratingInput = container.querySelector('input[value="4"]');
    fireEvent.click(ratingInput!);
    
    const textareaElement = container.querySelector('textarea');
    fireEvent.change(textareaElement!, { target: { value: 'Nice place' } });

    expect(submitButton).toBeDisabled();
  });

  test('submit button remains disabled with text but no rating', () => {
    const { container } = renderYourReviewForm();

    const submitButton = container.querySelector('button[type="submit"]');
    
    const textareaElement = container.querySelector('textarea');
    fireEvent.change(textareaElement!, { target: { value: 'This is a great place! I really enjoyed my stay here. The service was excellent and the location was perfect.' } });

    expect(submitButton).toBeDisabled();
  });

  test('rating selection updates checked state', () => {
    const { container } = renderYourReviewForm();

    const ratingInput = container.querySelector('input[value="3"]');
    fireEvent.click(ratingInput!);

    expect(ratingInput).toBeChecked();
  });

  test('textarea updates with user input', () => {
    const { container } = renderYourReviewForm();

    const textareaElement = container.querySelector('textarea');
    const testText = 'This is my review of the place.';
    
    fireEvent.change(textareaElement!, { target: { value: testText } });
    expect(textareaElement).toHaveValue(testText);
  });

  test('renders help text with requirements', () => {
    const { container } = renderYourReviewForm();

    const helpText = container.querySelector('.reviews__help');
    expect(helpText).toBeInTheDocument();
    expect(helpText?.textContent).toContain('To submit review please make sure to set');
    expect(helpText?.textContent).toContain('rating');
    expect(helpText?.textContent).toContain('50 characters');
    
    const ratingSpan = container.querySelector('.reviews__star');
    expect(ratingSpan).toBeInTheDocument();
    expect(ratingSpan?.textContent).toBe('rating');
    
    const charCount = container.querySelector('.reviews__text-amount');
    expect(charCount).toBeInTheDocument();
    expect(charCount?.textContent).toBe('50 characters');
  });

  test('renders star icons for rating labels', () => {
    const { container } = renderYourReviewForm();

    const starSvgs = container.querySelectorAll('svg.form__star-image');
    expect(starSvgs).toHaveLength(5);
    
    starSvgs.forEach(svg => {
      expect(svg).toHaveAttribute('width', '37');
      expect(svg).toHaveAttribute('height', '33');
      expect(svg.querySelector('use')).toHaveAttribute('xlink:href', '#icon-star');
    });
  });

  test('rating inputs are visually hidden', () => {
    const { container } = renderYourReviewForm();

    const ratingInputs = container.querySelectorAll('input[name="rating"]');
    ratingInputs.forEach(input => {
      expect(input).toHaveClass('visually-hidden');
    });
  });

  test('form has correct structure with fieldset', () => {
    const { container } = renderYourReviewForm();

    const fieldsetElement = container.querySelector('fieldset');
    expect(fieldsetElement).toBeInTheDocument();
    expect(fieldsetElement).toHaveClass('reviews__rating-form', 'form__rating');
  });

  test('matches snapshot', () => {
    const { container } = renderYourReviewForm();
    expect(container).toMatchSnapshot();
  });

  test('renders all CSS classes correctly', () => {
    const { container } = renderYourReviewForm();

    const expectedClasses = [
      'reviews__form',
      'form',
      'reviews__label',
      'form__label',
      'reviews__rating-form',
      'form__rating',
      'form__rating-input',
      'visually-hidden',
      'reviews__rating-label',
      'form__rating-label',
      'form__star-image',
      'reviews__textarea',
      'form__textarea',
      'reviews__button-wrapper',
      'reviews__help',
      'reviews__star',
      'reviews__text-amount',
      'reviews__submit',
      'form__submit',
      'button',
    ];

    expectedClasses.forEach((className) => {
      const elements = container.getElementsByClassName(className);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  test('button wrapper contains help text and submit button', () => {
    const { container } = renderYourReviewForm();

    const buttonWrapper = container.querySelector('.reviews__button-wrapper');
    expect(buttonWrapper).toBeInTheDocument();
    
    const helpText = buttonWrapper?.querySelector('.reviews__help');
    expect(helpText).toBeInTheDocument();
    
    const submitButton = buttonWrapper?.querySelector('button');
    expect(submitButton).toBeInTheDocument();
  });
});
