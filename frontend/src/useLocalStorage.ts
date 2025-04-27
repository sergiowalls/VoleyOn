import { useState, useEffect, Dispatch, SetStateAction } from "react";
import dayjs from 'dayjs';

export const useLocalStorage = <S>(key: string, defaultValue: S): [S, Dispatch<SetStateAction<S>>] => {
    const [value, setValue] = useState(() => {
        const saved = localStorage.getItem(key);
        if (!saved) {
            return defaultValue;
        }

        const parsed = JSON.parse(saved);
        const date = dayjs(parsed);
        return date.isValid() ? date : parsed;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
