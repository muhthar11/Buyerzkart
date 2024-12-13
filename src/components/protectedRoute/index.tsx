import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import propTypes from 'prop-types';

interface ProtectedRouteProps {
  Component: React.ComponentType; // Use React.ComponentType for components
  path: string;
}

function ProtectedRoute({ Component, path }: ProtectedRouteProps) {
  return (
    <Routes>
      <Route path={path} element={<Component />} />
    </Routes>
  );
}

// Prop Types are generally not used in TypeScript since interfaces provide the type checking
// If you want to keep prop-types for runtime checks (which is redundant with TypeScript), you can keep this:
ProtectedRoute.propTypes = {
  Component: propTypes.elementType.isRequired, // Changed to elementType which is correct for components
  path: propTypes.string.isRequired,
};

export default ProtectedRoute;
