import { motion } from 'motion/react';
import { useSkeletonContext } from './context/useSkeletonContext';
import './Skeleton.css';
import Bones from './parts/Bones';
import Defs from './parts/Defs';
import SkeletonManager from './parts/SkeletonManager';

export default function Skeleton() {
  const { viewBox } = useSkeletonContext();
  return (
    <div className="skeleton__box">
      <motion.svg
        className="svg"
        width="700"
        height="950"
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
  );
}
