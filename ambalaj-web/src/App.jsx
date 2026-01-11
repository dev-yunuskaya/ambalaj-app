import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InputScreen from './pages/InputScreen';
import PriceScreen from './pages/PriceScreen';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  Kağıt Bilgileri
                </Link>
                <Link
                  to="/prices"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  Kağıt Fiyatları
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<InputScreen />} />
            <Route path="/prices" element={<PriceScreen />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
