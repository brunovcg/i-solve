import Router from './router/Router';
import { Footer, Header } from './layout';
import { useContext } from 'react';
import { EventsContext } from './contexts';

function App() {
  const { renewSessionDialogRenderer } = useContext(EventsContext);

  return (
    <div className="App">
      <div className="im-app" id="im-app">
        <Header />
        <main>
          <Router />
        </main>
        <Footer />
      </div>
      {renewSessionDialogRenderer}
    </div>
  );
}

export default App;
