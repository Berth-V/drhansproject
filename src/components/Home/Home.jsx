import './Home.css';
import { Suspense, lazy } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Seo from '../Shared/Seo/Seo';
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
  const { t } = useTranslation();

  return (
    <div className="home">
      <Seo title={t('seo.home.title')} description={t('seo.home.description')} path="/" />

      <div className="frontpage-placeholder">
        <Frontpage />
      </div>
      <Suspense fallback={<div>{t('common.loading')}</div>}>
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