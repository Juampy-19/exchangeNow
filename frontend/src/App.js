import './App.css';
import Crypto from './components/Crypto.jsx';
import Fiat from './components/Fiat.jsx';

function App() {
  return (
    <>
     <h1>Exchange Now</h1>
     <Crypto />
     <Fiat />
    </>
  );
}

export default App;
