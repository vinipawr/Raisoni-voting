import '@fortawesome/fontawesome-free/css/all.min.css';
import MyVote from './pages/MyVote.jsx';
import ViewResults from './pages/ViewResults.jsx';
import CreateElection from './pages/CreateElection.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import './index.css';
import Dashboard from './pages/Dashboard.jsx';
import Vote from './pages/Vote.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/create-election" element={<CreateElection />} />
        <Route path="/view-results" element={<ViewResults />} />
        <Route path="/my-vote" element={<MyVote />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
