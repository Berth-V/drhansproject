import './Home.css';
import { Suspense, lazy } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import Frontpage from './Sections/Frontpage/Frontpage';
import { SkeletonProvider } from './Sections/Skeleton/context/SkeletonContext';
import {
  fadeUpVariant,
  fadeInVariant,
} from '../Shared/motionVariants/motionVariants';

const MinimallyInvasive = lazy(() => import('./Sections/MinimallyInvasive/MinimallyInvasive'));
const DiscHernia = lazy(() => import('./Sections/DiscHernia/DiscHernia'));
const KneeReplacement = lazy(() => import('./Sections/KneeReplacement/KneeReplacement'));
const Arthroscopy = lazy(() => import('./Sections/Arthroscopy/Arthroscopy'));
const Sciatica = lazy(() => import('./Sections/Sciatica/Sciatica'));
const Skeleton = lazy(() => import('./Sections/Skeleton/Skeleton'));
const Locations = lazy(() => import('./Sections/Locations/Locations'));
const Reviews = lazy(() => import('../Shared/Reviews/Reviews'));

function Home() {
  return (
    <div className="home">
      <Helmet>
        <title>Dr. Hans Ruiz | Traumatólogo y Ortopedista en Tijuana, B.C.</title>
        <meta
          name="description"
          content="Dr. Hans Ruiz, traumatólogo y ortopedista en Tijuana. Cirugía de columna, prótesis y artroscopia de hombro y rodilla. Costo de consulta: $1,200 MXN."
        />
        <link rel="canonical" href="https://hansruiztrauma.com.mx/" />
      </Helmet>

      <div className="frontpage-placeholder">
        <Frontpage />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <motion.div {...fadeUpVariant} className="mininv-placeholder">
          <MinimallyInvasive />
        </motion.div>

        <motion.div {...fadeUpVariant} className="disc-placeholder">
          <DiscHernia />
        </motion.div>

        <motion.div {...fadeUpVariant} className="knee-placeholder">
          <KneeReplacement />
        </motion.div>

        <motion.div {...fadeUpVariant} className="arthros-placeholder">
          <Arthroscopy />
        </motion.div>

        <motion.div {...fadeUpVariant} className="sciatica-placeholder">
          <Sciatica />
        </motion.div>

        <motion.div {...fadeUpVariant} className="skeleton-placeholder">
          <SkeletonProvider>
            <Skeleton />
          </SkeletonProvider>
        </motion.div>

        <motion.div {...fadeInVariant} className="map-placeholder">
          <Locations />
        </motion.div>

        <motion.div {...fadeUpVariant} className="reviews-placeholder">
          <Reviews />
        </motion.div>
      </Suspense>
    </div>
  );
}

export default Home;