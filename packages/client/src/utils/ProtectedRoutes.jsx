import React, { useEffect, useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';
const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUserToken = () => {
    const userToken = localStorage.getItem(`user-token`);
    if (!userToken || userToken === `undefined`) {
      setIsLoggedIn(false);
      return navigate(`/login`);
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
  }, [ checkUserToken, isLoggedIn ]);
  return (
    <React.Fragment>
      {
        // eslint-disable-next-line react/destructuring-assignment
        isLoggedIn ? props.children : null
      }
    </React.Fragment>
  );
};
export default ProtectedRoute;
