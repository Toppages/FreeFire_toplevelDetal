import './App.css';
import Login from './Pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function AppContent() {

  return (
    <>

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/Top-level-redeem" element={<Login />} />

        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;