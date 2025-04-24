import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AccessPopup from './AccessPopup';

function RestrictRoute({ children }) {
  const authData = useSelector((state) => state.auth.userInfo);
  const [hasAccess, setHasAccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  
  useEffect(() => {
    if (authData?.status === 'Accepted') {
      setHasAccess(true);
    } else {
      setHasAccess(false);
      setShowPopup(true); 
    }
  }, [authData]);

  
  const handleClick = useCallback(() => {
    if (!hasAccess) {
      setShowPopup(true);
    }
  }, [hasAccess]);

  useEffect(() => {
    if (!hasAccess) {
      document.body.addEventListener('click', handleClick);
    }

    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, [hasAccess, handleClick]);

  if (!authData) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {children}
      {!hasAccess && showPopup && (
        <AccessPopup onClose={() => setShowPopup(false)} />
      )}
    </>
  );
}

export default RestrictRoute;
