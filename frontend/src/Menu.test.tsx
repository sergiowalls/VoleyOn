import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Menu from './Menu.tsx';

function renderMenu() {
    return render(
        <MemoryRouter>
            <Menu/>
        </MemoryRouter>
    );
}

describe('Menu', () => {
    it('renders the app name', () => {
        renderMenu();
        expect(screen.getAllByText('VoleyOn').length).toBeGreaterThan(0);
    });

    it('renders the Torneos navigation link', () => {
        renderMenu();
        const links = screen.getAllByRole('link', { name: /torneos/i });
        expect(links.length).toBeGreaterThan(0);
    });

    it('renders the Acerca de navigation link', () => {
        renderMenu();
        const links = screen.getAllByRole('link', { name: /acerca de/i });
        expect(links.length).toBeGreaterThan(0);
    });
});
