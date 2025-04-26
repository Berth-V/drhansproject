import { motion } from 'motion/react';
import { useSkeletonContext } from './context/useSkeletonContext';
import Bones from './parts/Bones';
import Foot from './parts/Foot';
import Ankle from './parts/Ankle';
import TibiaFibula from './parts/TibiaFibula';
import Knee from './parts/Knee';
import Femur from './parts/Femur';
import Hip from './parts/Hip';
import Hand from './parts/Hand';
import Wrist from './parts/Wrist';
import LumbarSpine from './parts/LumbarSpine';
import Forearm from './parts/Forearm';
import Elbow from './parts/Elbow';
import ThoracicSpine from './parts/ThoracicSpine';
import Ribs from './parts/Ribs';
import Humerus from './parts/Humerus';
import Shoulder from './parts/Shoulder';
import Clavicle from './parts/Clavicle';
import CervicalSpine from './parts/CervicalSpine';
import Defs from './parts/Defs';

export default function SkeletonManager() {
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
          <Foot />
          <Ankle />
          <TibiaFibula />
          <Knee />
          <Femur />
          <Hip />
          <Hand />
          <Wrist />
          <LumbarSpine />
          <Forearm />
          <Elbow />
          <ThoracicSpine />
          <Ribs />
          <Humerus />
          <Shoulder />
          <Clavicle />
          <CervicalSpine />
        </g>
        <Defs />
      </motion.svg>
    </div>
  );
}
