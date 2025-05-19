import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultsSection from './ResultsSection';

describe('ResultsSection Component', () => {
  it('renders the movie name section', () => {
    render(<ResultsSection />);

    expect(screen.getByText(/The movie you chose is/)).toBeInTheDocument();
    expect(screen.getByText('movie name')).toBeInTheDocument();
  });

  it('renders the sentiment section', () => {
    render(<ResultsSection />);

    expect(screen.getByText(/Its overall sentiment is/)).toBeInTheDocument();
    expect(screen.getByText('sentiment')).toBeInTheDocument();
  });

  it('renders the summary section', () => {
    render(<ResultsSection />);

    expect(screen.getByText(/\(Summary here\)/)).toBeInTheDocument();
  });

  it('renders the star rating section', () => {
    render(<ResultsSection />);

    expect(screen.getByText('Total Stars')).toBeInTheDocument();
    expect(screen.getByLabelText('0 out of 5 stars')).toBeInTheDocument();
    expect(screen.getByText('☆☆☆☆☆')).toBeInTheDocument();
  });
});
