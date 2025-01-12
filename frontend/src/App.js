import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TransactionDetailsPage from './pages/TransactionDetailsPage';
import TransactionStatusPage from './pages/TransactionStatusPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transaction-details" element={<TransactionDetailsPage />} />
          <Route path="/transaction-status" element={<TransactionStatusPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
