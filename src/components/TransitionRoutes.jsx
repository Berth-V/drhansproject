import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
const Home = lazy(() => import('./Home/Home'));

function TransitionRoutes() {
  const location = useLocation();
  // State to capture an String without "/" of location.pathname
  //const [newPath, SetNewPath] = useState();
  useEffect(() => {
    scrollTo(0, 0);
    //SetNewPath(location.pathname.slice(1));
  }, [location]);

  return (
    <Suspense fallback={<h1>Cargando</h1>}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default TransitionRoutes;
