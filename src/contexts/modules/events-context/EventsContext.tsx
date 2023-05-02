import { createContext, useMemo } from 'react';
import { EventsContextTypes } from './EventsContext.types';
import { ProviderProps } from '../../types';
import { useRenewSession } from '../../../hooks';

export const EventsContext = createContext<EventsContextTypes>({} as EventsContextTypes);

export function EventsProvider({ children }: ProviderProps) {
  const { renewSessionDialogRenderer } = useRenewSession();

  const providerValues = useMemo(() => ({ renewSessionDialogRenderer }), [renewSessionDialogRenderer]);

  return <EventsContext.Provider value={providerValues}>{children}</EventsContext.Provider>;
}
