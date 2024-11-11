import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useUser();
  console.log(user)
  if (isLoading) {
    return <div>Loading...</div>; // Hoặc component loading của bạn
  }

  // if (!user) {
  //   return <Navigate to="/login" />;
  // }
  if (user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;