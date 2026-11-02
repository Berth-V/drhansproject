import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase/auth';

// Sin VITE_ADMIN_UID nadie entra al panel
const ADMIN_UID = import.meta.env.VITE_ADMIN_UID;

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  if (user === undefined) return null; // esperando verificación de sesión

  // Solo el doctor: los pacientes de /seguros también tienen sesión (anónima)
  const isDoctor = Boolean(user) && !user.isAnonymous && user.uid === ADMIN_UID;

  return isDoctor ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
