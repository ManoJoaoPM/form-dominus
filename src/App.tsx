import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MCMV from './pages/MCMV';
import AltoPadrao from './pages/AltoPadrao';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mcmv" element={<MCMV />} />
        <Route path="/alto-padrao" element={<AltoPadrao />} />
      </Routes>
    </Router>
  );
}
