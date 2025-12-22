import './Home.css';
import { Suspense, lazy } from 'react';
import { motion } from 'motion/react';
import Frontpage from './Sections/Frontpage/Frontpage';
import { SkeletonProvider } from './Sections/Skeleton/context/SkeletonContext';
import {
  fadeUpVariant,
  fadeInVariant,
} from '../Shared/motionVariants/motionVariants';

const Skeleton = lazy(() => import('./Sections/Skeleton/Skeleton'));
const Map = lazy(() => import('./Sections/Map/Map'));
const Reviews = lazy(() => import('./Sections/Reviews/Reviews'));

function Home() {
  const EMBED_SRC =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3363.7307095367255!2d-117.02497272400664!3d32.53333847376642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d949ded0c8ef3d%3A0xf3151848b6171d2!2sDr%20Hans%20Ruiz%20Traumat%C3%B3logo!5e0!3m2!1sen!2smx!4v1759176342362!5m2!1sen!2smx';

  return (
    <div className="home">
      <div className="frontpage-placeholder">
        <Frontpage />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <motion.div {...fadeUpVariant} className="skeleton-placeholder">
          <SkeletonProvider>
            <Skeleton />
          </SkeletonProvider>
        </motion.div>

        <motion.div {...fadeInVariant} className="map-placeholder">
          <Map embedSrc={EMBED_SRC} />
        </motion.div>

        <motion.div {...fadeUpVariant} className="reviews-placeholder">
          <Reviews />
        </motion.div>
      </Suspense>
    </div>
  );
}

export default Home;
