import './App.css';
import { HashRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import TransitionRoutes from './components/TransitionRoutes';

function App() {
  return (
    <>
      <HashRouter>
        <Header />
        <TransitionRoutes />
      </HashRouter>
    </>
  );
}

export default App;
