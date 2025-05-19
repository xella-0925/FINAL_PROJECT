import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieLinkInput from './MovieLinkInput';

describe('MovieLinkInput Component', () => {
  it('renders the input field and button', () => {
    const mockSetMovieLink = vi.fn();
    const mockOnAnalyze = vi.fn();

    render(
      <MovieLinkInput
        movieLink=""
        setMovieLink={mockSetMovieLink}
        onAnalyze={mockOnAnalyze}
        isAnalyzing={false}
      />
    );

    expect(screen.getByLabelText('Movie Link')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Analyze' })).toBeInTheDocument();
  });

  it('calls setMovieLink when input changes', () => {
    const mockSetMovieLink = vi.fn();
    const mockOnAnalyze = vi.fn();

    render(
      <MovieLinkInput
        movieLink=""
        setMovieLink={mockSetMovieLink}
        onAnalyze={mockOnAnalyze}
        isAnalyzing={false}
      />
    );

    const input = screen.getByLabelText('Movie Link');
    fireEvent.change(input, { target: { value: 'https://example.com/movie' } });

    expect(mockSetMovieLink).toHaveBeenCalledWith('https://example.com/movie');
  });

  it('calls onAnalyze when button is clicked', () => {
    const mockSetMovieLink = vi.fn();
    const mockOnAnalyze = vi.fn();

    render(
      <MovieLinkInput
        movieLink="https://example.com/movie"
        setMovieLink={mockSetMovieLink}
        onAnalyze={mockOnAnalyze}
        isAnalyzing={false}
      />
    );

    const button = screen.getByRole('button', { name: 'Analyze' });
    fireEvent.click(button);

    expect(mockOnAnalyze).toHaveBeenCalled();
  });

  it('disables button when isAnalyzing is true', () => {
    const mockSetMovieLink = vi.fn();
    const mockOnAnalyze = vi.fn();

    render(
      <MovieLinkInput
        movieLink="https://example.com/movie"
        setMovieLink={mockSetMovieLink}
        onAnalyze={mockOnAnalyze}
        isAnalyzing={true}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Analyzing...');
  });

  it('disables button when movieLink is empty', () => {
    const mockSetMovieLink = vi.fn();
    const mockOnAnalyze = vi.fn();

    render(
      <MovieLinkInput
        movieLink=""
        setMovieLink={mockSetMovieLink}
        onAnalyze={mockOnAnalyze}
        isAnalyzing={false}
      />
    );

    const button = screen.getByRole('button', { name: 'Analyze' });
    expect(button).toBeDisabled();
  });
});
