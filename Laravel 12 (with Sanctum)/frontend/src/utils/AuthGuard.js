import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children, ability }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Check if token is present
  if (!token) {
    const errorMessage = "Missing token";
    const errorStatus = 401;

    return <Navigate to={`/?error=${encodeURIComponent(errorMessage)}&status=${errorStatus}`} replace />;
  }

  // Check if the role matches the ability
  if (role !== ability) {
    let errorMessage = "You don't have the right permissions";
    const errorStatus = 403;
    if (ability === 'admin') {
      errorMessage = "You are not the administrator";
    }

    return <Navigate to={`/?error=${encodeURIComponent(errorMessage)}&status=${errorStatus}`} replace />;
  }

  // If token exists and role matches ability, render children
  return children;
};

export default AuthGuard;
