import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import PrivateRoute from './components/Blog/Admin/PrivateRoute';
import { trackPageView } from './analytics/pageViews';

const Home = lazy(() => import('./components/Home/Home'));
const About = lazy(() => import('./components/About/About'));
const Procedures = lazy(() => import('./components/Procedures/Procedures'));
const ProceduresDetail = lazy(
  () => import('./components/Procedures/ProceduresDetail')
);
const Contact = lazy(() => import('./components/Contact/Contact'));
const PrivacyPolicy = lazy(
  () => import('./components/PrivacyPolicy/PrivacyPolicy')
);
const BlogHome = lazy(() => import('./components/Blog/pages/BlogHome'));
const BlogPost = lazy(() => import('./components/Blog/pages/BlogPost'));
const AdminPanel = lazy(() => import('./components/Blog/Admin/AdminPanel'));
const PostForm = lazy(() => import('./components/Blog/Admin/PostForm'));
const LoginPage = lazy(() => import('./components/Blog/Admin/LoginPage'));
const QuestionsSection = lazy(() => import('./components/Blog/pages/QuestionsSection'));

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    scrollTo(0, 0);
    trackPageView(location.pathname);
  }, [location]);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/about" element={<About />} />
        <Route path="/procedures" element={<Procedures />} />
        <Route path="/procedures/:partId" element={<ProceduresDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/blog" element={<BlogHome />} />
        <Route path="/preguntas" element={<QuestionsSection />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/new"
          element={
            <PrivateRoute>
              <PostForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/edit/:postId"
          element={
            <PrivateRoute>
              <PostForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
