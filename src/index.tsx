import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { configs } from './configs';
import { CONSTANTS } from './constants';
import ContextsProvider from './contexts/ContextsProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/primereact.min.css';
import { environmentHelper } from './helpers';

const queryClient = new QueryClient();
const { DEVELOPMENT } = CONSTANTS.ENVIRONMENT;
const { reactQuery, toastConfigs } = configs;
const { initialIsOpen, position } = reactQuery.devTools;
const { environment } = environmentHelper;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextsProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <GlobalStyles />
          <ToastContainer {...toastConfigs} />
          {environment === DEVELOPMENT && <ReactQueryDevtools initialIsOpen={initialIsOpen} position={position} />}
        </QueryClientProvider>
      </ContextsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
