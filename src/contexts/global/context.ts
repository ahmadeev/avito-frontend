import React, { createContext } from 'react';

interface GlobalContextType {
    properties: Record<string, unknown>
    setProperties: React.Dispatch<React.SetStateAction<Record<string, unknown>>>
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
