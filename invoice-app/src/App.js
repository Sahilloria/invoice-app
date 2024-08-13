
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import ReturnPage from './pages/ReturnPage';
import "./App.css";

function App() {
  let schema;
  
  const location = document.location.hostname;
  if (location === "localhost") {
    schema = "http://localhost:8000/api/invoice-app"
  } else {
    schema = "https://invoice-app-backendv1.vercel.app/api/invoice-app"
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage schema={schema} />} />
        <Route path="/return" element={<ReturnPage />} />
      </Routes>
    </Router>
  );
}

export default App;
