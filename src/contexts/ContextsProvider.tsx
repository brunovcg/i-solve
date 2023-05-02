import { ProviderProps } from './types';
import UserProvider from './modules/user-context/UserContext';
import { EventsProvider } from './modules/events-context/EventsContext';

export default function ContextsProvider({ children }: ProviderProps) {
  return (
    <UserProvider>
      <EventsProvider> {children}</EventsProvider>
    </UserProvider>
  );
}
