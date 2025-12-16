import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AccessPopup from './AccessPopup';

function RestrictRoute({ children }) {
  const authData = useSelector((state) => state.auth.userInfo);
  const [hasAccess, setHasAccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authData === undefined || authData === null) {
      // still waiting for auth state to be resolved
      setLoading(true);
    } else {
      setLoading(false);

      if (authData?.status === 'Accepted') {
        setHasAccess(true);
      } else {
        setHasAccess(false);
        setShowPopup(true);
      }
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

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!authData) {
    return <Navigate to="/login" replace />;
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
