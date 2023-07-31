import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/index.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import ProtectedRoute from './utils/ProtectedRoutes';
import { Login } from './pages/Login/login';
import { DashboardBulletin } from './pages/Dashboard/DashboardBulletin';
import { AssessmentList } from './pages/Assessments/AssessmentList';
import { NewAssessment } from './pages/Assessments/NewAssessment';

const root = ReactDOM.createRoot(
  document.getElementById(`root`) as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter basename={`/`}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<App />}>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardBulletin />
            </ProtectedRoute>
          } />
          <Route path="/assessment/list" element={
            <ProtectedRoute>
              <AssessmentList />
            </ProtectedRoute>
          } />
          <Route path="/assessment/new" element={
            <ProtectedRoute>
              <NewAssessment />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
