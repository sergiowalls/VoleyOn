import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import TournamentCard from './TournamentCard.tsx';
import { TournamentDTO } from './TournamentDTO.ts';

const FUTURE_DATE = '2099-06-15';

const baseTournament: TournamentDTO = {
    id: 1,
    name: 'Test Tournament',
    field: 'Beach',
    gender: 'Mixed',
    players_on_field: 4,
    date: FUTURE_DATE,
    price: 20,
    minimum_age: 18,
    link: 'https://example.com/register',
    poster: 'https://example.com/poster.jpg',
    location: {
        id: 1,
        name: 'Club Deportivo',
        address: 'Calle Principal 1',
        postal_code: 28001,
        city: 1,
        province: 1,
    },
};

function renderCard(props: Partial<TournamentDTO> = {}) {
    return render(
        <MemoryRouter>
            <TournamentCard {...baseTournament} {...props}/>
        </MemoryRouter>
    );
}

describe('TournamentCard', () => {
    it('renders the tournament name', () => {
        renderCard();
        expect(screen.getByText('Test Tournament')).toBeInTheDocument();
    });

    it('renders the parsed location', () => {
        renderCard();
        expect(screen.getByText(/Club Deportivo, Calle Principal 1/)).toBeInTheDocument();
    });

    it('renders the field chip translated to Spanish', () => {
        renderCard({ field: 'Beach' });
        expect(screen.getByText('Playa')).toBeInTheDocument();
    });

    it('renders the gender chip translated to Spanish', () => {
        renderCard({ gender: 'Male' });
        expect(screen.getByText('Masculino')).toBeInTheDocument();
    });

    it('renders the players chip', () => {
        renderCard({ players_on_field: 6 });
        expect(screen.getByText('6x6')).toBeInTheDocument();
    });

    it('renders the price chip', () => {
        renderCard({ price: 25 });
        expect(screen.getByText('25€/persona')).toBeInTheDocument();
    });

    it('renders the minimum age chip', () => {
        renderCard({ minimum_age: 16 });
        expect(screen.getByText('Mayores de 16 años')).toBeInTheDocument();
    });

    it('renders the registration link button', () => {
        const { container } = renderCard();
        // The card is hidden until the image fires a load/error event
        fireEvent.load(container.querySelector('img')!);
        const button = screen.getByRole('link', { name: /me interesa/i });
        expect(button).toHaveAttribute('href', 'https://example.com/register');
    });

    it('shows a past tournament warning for past dates', () => {
        renderCard({ date: '2000-01-01' });
        expect(screen.getByText('Este torneo ya ha ocurrido.')).toBeInTheDocument();
    });

    it('does not show a past tournament warning for future dates', () => {
        renderCard({ date: FUTURE_DATE });
        expect(screen.queryByText('Este torneo ya ha ocurrido.')).not.toBeInTheDocument();
    });

    it('does not render the link button when no link is provided', () => {
        renderCard({ link: undefined });
        expect(screen.queryByRole('link', { name: /me interesa/i })).not.toBeInTheDocument();
    });
});
