import React, { useEffect, useState } from 'react';
import { createBrowserRouter, Outlet, Route, RouterProvider, Routes } from 'react-router-dom';
import { Navigation, SiteWrapper } from './components';
import { DashboardBulletin } from './pages/Dashboard/DashboardBulletin';
import { NewAssessment } from './pages/Assessments/NewAssessment.jsx';
import { AssessmentList } from './pages/Assessments/AssessmentList';
import { Login } from './pages/Login/login';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    element: <DashboardBulletin />,
    path: `/`,
  },
  {
    element: <NewAssessment />,
    path: `/assessment/new`,
  },
  {
    element: <AssessmentList />,
    path: `/assessment/list`,
  },
  {
    element: <Login />,
    path: `/login`,
  },
]);

const App = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const checkUserToken = () => {
    const userToken = localStorage.getItem(`user-token`);

    if (!userToken || userToken === undefined) {
      setIsLoggedIn(false);
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
  }, [ isLoggedIn ]);

  return (
    <React.Fragment>
      {isLoggedIn && <Navigation />}
      <Outlet />
    </React.Fragment>

  );

};

export default App;
