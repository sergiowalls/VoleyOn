import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage.ts';

describe('useLocalStorage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('returns the default value when nothing is stored', () => {
        const { result } = renderHook(() => useLocalStorage('key', 'default'));
        expect(result.current[0]).toBe('default');
    });

    it('returns a stored string value', () => {
        localStorage.setItem('key', JSON.stringify('stored'));
        const { result } = renderHook(() => useLocalStorage('key', ''));
        expect(result.current[0]).toBe('stored');
    });

    it('persists an updated value to localStorage', () => {
        const { result } = renderHook(() => useLocalStorage('key', ''));
        act(() => {
            result.current[1]('new value');
        });
        expect(localStorage.getItem('key')).toBe(JSON.stringify('new value'));
    });

    it('parses a stored dayjs-compatible date string as a dayjs object', () => {
        localStorage.setItem('date', JSON.stringify('2024-01-15'));
        const { result } = renderHook(() => useLocalStorage('date', null));
        const value = result.current[0] as { isValid: () => boolean; format: (f: string) => string } | null;
        expect(value).not.toBeNull();
        expect(value!.isValid()).toBe(true);
        expect(value!.format('YYYY-MM-DD')).toBe('2024-01-15');
    });
});
