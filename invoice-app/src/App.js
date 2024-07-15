
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import ReturnPage from './pages/ReturnPage';
import "./App.css"
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path="/return"  element={<ReturnPage/>}  />
      </Routes>
    </Router>
  );
}

export default App;
