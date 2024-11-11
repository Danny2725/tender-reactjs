import { Navigate } from 'react-router-dom';


interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {


  return <>{children}</>;
};

export default ProtectedRoute;