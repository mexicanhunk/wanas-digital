import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from './Navbar';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#shop' },
];

describe('Navbar', () => {
  it('renders logo text', () => {
    render(<Navbar links={links} />);
    expect(screen.getByText('Wanas Digital')).toBeInTheDocument();
  });

  it('renders all nav links', () => {
    render(<Navbar links={links} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '#home',
    );
    expect(screen.getByRole('link', { name: 'Shop' })).toHaveAttribute(
      'href',
      '#shop',
    );
  });

  it('shows cart count when > 0', () => {
    render(<Navbar links={links} cartCount={3} />);
    expect(screen.getByText('3')).toHaveClass('wd-cart-count');
  });

  it('hides cart count badge when 0', () => {
    const { container } = render(<Navbar links={links} cartCount={0} />);
    expect(container.querySelector('.wd-cart-count')).not.toBeInTheDocument();
  });

  it('calls onCartClick', () => {
    const fn = vi.fn();
    render(<Navbar links={links} onCartClick={fn} />);
    screen.getByRole('button', { name: /cart/i }).click();
    expect(fn).toHaveBeenCalledOnce();
  });
});
