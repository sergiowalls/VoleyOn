import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Home from './Home.tsx';

function renderHome() {
    return render(
        <MemoryRouter>
            <Home/>
        </MemoryRouter>
    );
}

describe('Home', () => {
    it('renders the province search prompt', () => {
        renderHome();
        expect(screen.getByText(/buscar torneos en/i)).toBeInTheDocument();
    });

    it('renders the province autocomplete input', () => {
        renderHome();
        expect(screen.getByPlaceholderText('tu provincia')).toBeInTheDocument();
    });

    it('renders the promotional image', () => {
        renderHome();
        expect(screen.getByAltText('Imagen promocional')).toBeInTheDocument();
    });
});
