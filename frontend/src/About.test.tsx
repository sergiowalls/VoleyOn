import { render, screen } from '@testing-library/react';
import About from './About.tsx';

describe('About', () => {
    it('renders the heading', () => {
        render(<About/>);
        expect(screen.getByText('Acerca de')).toBeInTheDocument();
    });

    it('renders a link to the GitHub repository', () => {
        render(<About/>);
        const link = screen.getByRole('link', { name: /github\.com\/sergiowalls\/VoleyOn/i });
        expect(link).toHaveAttribute('href', 'https://github.com/sergiowalls/VoleyOn');
    });
});
