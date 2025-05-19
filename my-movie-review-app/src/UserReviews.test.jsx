import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserReviews from './UserReviews';

describe('UserReviews Component', () => {
  it('renders the section title', () => {
    render(<UserReviews />);

    expect(screen.getByText('User Reviews and Predictions')).toBeInTheDocument();
  });

  it('renders review cards', () => {
    render(<UserReviews />);

    const reviewCards = screen.getAllByRole('listitem');
    expect(reviewCards.length).toBe(4);
  });

  it('renders the next button', () => {
    render(<UserReviews />);

    expect(screen.getByLabelText('Next reviews')).toBeInTheDocument();
  });

  it('renders pagination dots', () => {
    render(<UserReviews />);

    const paginationDots = screen.getAllByLabelText(/Page \d/);
    expect(paginationDots.length).toBe(3);
  });
});
