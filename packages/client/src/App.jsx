import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './components';

import 'bootstrap/dist/css/bootstrap.min.css';

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
