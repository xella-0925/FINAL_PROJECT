import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App'; // Import the main component
vi.mock('./components/Header', () => ({ default: () => <div data-testid="header-component">Header Component</div> }));
vi.mock('./components/MovieLinkInput', () => ({ default: ({ movieLink, setMovieLink, onAnalyze }) => ( ... ) })); // Adjust props mock if needed
vi.mock('./components/UserReviews', () => ({ default: () => <div data-testid="user-reviews">User Reviews Component</div> }));
vi.mock('./components/ResultsSection', () => ({ default: () => <div data-testid="results-section">Results Section Component</div> }));

// Mock the child components to simplify testing
vi.mock('./Header', () => ({
  default: () => <div data-testid="header-component">Header Component</div>
}));

vi.mock('./MovieLinkInput', () => ({
  default: ({ movieLink, setMovieLink, onAnalyze }) => (
    <div data-testid="movie-link-input">
      <input
        data-testid="movie-link-field"
        value={movieLink}
        onChange={(e) => setMovieLink(e.target.value)}
      />
      <button data-testid="analyze-button" onClick={onAnalyze}>Analyze</button>
    </div>
  )
}));

vi.mock('./UserReviews', () => ({
  default: () => <div data-testid="user-reviews">User Reviews Component</div>
}));

vi.mock('./ResultsSection', () => ({
  default: () => <div data-testid="results-section">Results Section Component</div>
}));

describe('InputDesign Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all child components', () => {
    render(<InputDesign />);

    expect(screen.getByTestId('header-component')).toBeInTheDocument();
    expect(screen.getByTestId('movie-link-input')).toBeInTheDocument();
    expect(screen.getByTestId('user-reviews')).toBeInTheDocument();
    expect(screen.getByTestId('results-section')).toBeInTheDocument();
  });

  it('updates movie link state when input changes', () => {
    render(<InputDesign />);

    const input = screen.getByTestId('movie-link-field');
    fireEvent.change(input, { target: { value: 'https://example.com/movie-review' } });

    expect(input.value).toBe('https://example.com/movie-review');
  });

  it('handles analyze button click', () => {
    vi.useFakeTimers();
    render(<InputDesign />);

    const input = screen.getByTestId('movie-link-field');
    const analyzeButton = screen.getByTestId('analyze-button');

    // Enter a movie link
    fireEvent.change(input, { target: { value: 'https://example.com/movie-review' } });

    // Click analyze button
    fireEvent.click(analyzeButton);

    // Fast-forward timers
    vi.runAllTimers();

    // Verify the component doesn't crash
    expect(screen.getByTestId('results-section')).toBeInTheDocument();

    vi.useRealTimers();
  });
});
