import { type ReactNode, useState } from 'react';
import { GlobalContext } from './context.ts';

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [properties, setProperties] = useState<Record<string, unknown>>({});

    return (
        <GlobalContext.Provider value={{ properties, setProperties }}>
            {children}
        </GlobalContext.Provider>
    );
};
