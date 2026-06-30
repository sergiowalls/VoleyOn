import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Tournaments from './Tournaments.tsx';
import { TournamentDTO } from './TournamentDTO.ts';

const mockTournaments: TournamentDTO[] = [
    {
        id: 1,
        name: 'Torneo Playa',
        field: 'Beach',
        gender: 'Mixed',
        players_on_field: 4,
        date: '2099-08-20',
        price: 15,
        poster: '',
        location: {
            id: 1,
            name: 'Club Deportivo',
            address: 'Calle Mar 1',
            postal_code: 8001,
            city: 'Barcelona',
            province: 'Barcelona',
        },
    },
    {
        id: 2,
        name: 'Torneo Pista',
        field: 'Court',
        gender: 'Male',
        players_on_field: 6,
        date: '2099-09-10',
        price: 20,
        poster: '',
        location: {
            id: 2,
            name: 'Pabellon',
            address: 'Calle Centro 5',
            postal_code: 28001,
            city: 'Madrid',
            province: 'Madrid',
        },
    },
];

function renderTournaments() {
    return render(
        <MemoryRouter>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Tournaments/>
            </LocalizationProvider>
        </MemoryRouter>
    );
}

describe('Tournaments', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('shows the loading message initially', () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            json: () => new Promise(() => {}),
        } as Response);

        renderTournaments();
        expect(screen.getByText('Buscando torneos...')).toBeInTheDocument();
    });

    it('shows a message when no tournaments are found', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            json: () => Promise.resolve([]),
        } as Response);

        renderTournaments();
        await waitFor(() => {
            expect(screen.getByText('No se han encontrado torneos')).toBeInTheDocument();
        });
    });

    it('renders the tournament count when tournaments are found', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            json: () => Promise.resolve(mockTournaments),
        } as Response);

        renderTournaments();
        await waitFor(() => {
            expect(screen.getByText('2 torneos encontrados')).toBeInTheDocument();
        });
    });

    it('renders a card for each tournament', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            json: () => Promise.resolve(mockTournaments),
        } as Response);

        renderTournaments();
        await waitFor(() => {
            expect(screen.getByText('Torneo Playa')).toBeInTheDocument();
            expect(screen.getByText('Torneo Pista')).toBeInTheDocument();
        });
    });

    it('fetches from the tournaments API endpoint', async () => {
        const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            json: () => Promise.resolve([]),
        } as Response);

        renderTournaments();
        await waitFor(() => {
            expect(fetchSpy).toHaveBeenCalledWith(
                expect.stringContaining('/tournaments/')
            );
        });
    });
});
