import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  it('renders the logo with correct attributes', () => {
    render(<Header />);

    const logo = screen.getByAltText('ReelSense');
    expect(logo).toBeInTheDocument();
    expect(logo.tagName).toBe('IMG');
    expect(logo).toHaveAttribute('src', 'https://cdn.builder.io/api/v1/image/assets/TEMP/8fa7525c80fedf8b75d84f61ca82db8544b3923b');
  });

  it('renders the description text', () => {
    render(<Header />);

    expect(screen.getByText(/Wanna know if a movie's a feel-good hit or a total buzzkill\? We got you\./i)).toBeInTheDocument();
    expect(screen.getByText(/Drop a movie review link here – we'll read it, sum up the buzz, and rate it from 1 to 5 stars!/i)).toBeInTheDocument();
  });
});
