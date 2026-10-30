import './Home.css';
import { Suspense, lazy } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Seo from '../Shared/Seo/Seo';
import Frontpage from './Sections/Frontpage/Frontpage';
import TrustBar from './Sections/TrustBar/TrustBar';
import { SkeletonProvider } from './Sections/Skeleton/context/SkeletonContext';
import { loadPartsData } from './Sections/Skeleton/data';
import { INFO_SECTIONS } from './Sections/InfoSection/sections';
import {
  fadeUpVariant,
  fadeInVariant,
} from '../Shared/motionVariants/motionVariants';

const MinimallyInvasive = lazy(() => import('./Sections/MinimallyInvasive/MinimallyInvasive'));
const InfoSection = lazy(() => import('./Sections/InfoSection/InfoSection'));
// El esqueleto se muestra cuando ya cargaron el componente y los datos de su idioma
const Skeleton = lazy(() =>
  Promise.all([import('./Sections/Skeleton/Skeleton'), loadPartsData()]).then(([module]) => module)
);
const Locations = lazy(() => import('./Sections/Locations/Locations'));
const Reviews = lazy(() => import('../Shared/Reviews/Reviews'));
const HomeCta = lazy(() => import('./Sections/HomeCta/HomeCta'));

// Zonas: portada marina → procedimientos en claro → esqueleto marino → reseñas, consultorios y cierre en claro
function Home() {
  const { t } = useTranslation();

  return (
    <div className="home">
      <Seo title={t('seo.home.title')} description={t('seo.home.description')} path="/" />

      <div className="frontpage-placeholder">
        <Frontpage />
      </div>
      <TrustBar />
      <Suspense fallback={<div className="home__loading">{t('common.loading')}</div>}>
        <div className="home__light home__light--procedures">
          <motion.div {...fadeUpVariant} className="mininv-placeholder">
            <MinimallyInvasive />
          </motion.div>

          {INFO_SECTIONS.map((section) => (
            <motion.div key={section.id} {...fadeUpVariant} className="info-placeholder">
              <InfoSection {...section} />
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUpVariant} className="skeleton-placeholder">
          <SkeletonProvider>
            <Skeleton />
          </SkeletonProvider>
        </motion.div>

        <div className="home__light">
          <motion.div {...fadeUpVariant} className="reviews-placeholder">
            <Reviews variant="light" />
          </motion.div>

          <motion.div {...fadeInVariant} className="map-placeholder">
            <Locations />
          </motion.div>

          <motion.div {...fadeUpVariant}>
            <HomeCta />
          </motion.div>
        </div>
      </Suspense>
    </div>
  );
}

export default Home;
