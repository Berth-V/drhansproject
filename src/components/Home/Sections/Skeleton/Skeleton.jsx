import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useSkeletonContext } from './context/useSkeletonContext';
import './Skeleton.css';
import Bones from './parts/Bones';
import Defs from './parts/Defs';
import SkeletonManager from './parts/SkeletonManager';

export default function Skeleton() {
  const { viewBox } = useSkeletonContext();
  const { t } = useTranslation();
  return (<>
    <h2 className="skeleton__title">
      {t('skeleton.title')}
    </h2>
    <div className="skeleton__box">
      <motion.svg
        className="svg"
        viewBox={viewBox}
        animate={{ viewBox }}
        transition={{
          duration: 0.7,
          ease: 'easeInOut',
        }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Skeleton">
          <Bones />
          <SkeletonManager />
        </g>
        <Defs />
      </motion.svg>
    </div>
  </>
  );
}
