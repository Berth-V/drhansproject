import { motion, AnimatePresence } from 'motion/react';
import { partConfigs } from './data/partConfigs';
import { useSkeletonContext } from './Skeleton/context/useSkeletonContext';
import { opacityAnimation, scaleAnimation } from '../motionVariants/motionVariants';

export default function SkeletonManager() {
    const { selectedPart, circleFunctions, backBtnFunctions } = useSkeletonContext();
  return (
    <>
      {partConfigs.map((config) => {
        const { name, default: def, active } = config;
        const isActive = selectedPart === name;

        return (
          <AnimatePresence key={name} mode="wait" initial={false}>
            {!isActive && (
              <motion.g
                key="default"
                variants={opacityAnimation}
                initial="show"
                exit="hide"
              >
                <motion.circle
                  id={`${name} Elipse`}
                  cx={def.cx}
                  cy={def.cy}
                  r={def.r}
                  onClick={() =>
                    circleFunctions(
                      name,
                      def.minX,
                      def.minY,
                      def.width,
                      def.height  
                    )
                  }
                  fill="transparent"
                  stroke="#F5F5F5"
                  strokeWidth={2}
                  // Motion Variants
                  variants={scaleAnimation}
                  whileHover="hover"
                />
                <path
                  id={`${name} Line`}
                  d={def.lineProps.d}
                  stroke="#F5F5F5"
                  strokeWidth={2}
                />
                <g id={`${name} Tittle`}>
                  {def.titlePaths.map((p) => (
                    <path key={p.id} id={p.id} d={p.d} fill="white" />
                  ))}
                </g>
              </motion.g>
            )}
            {isActive && (
              <motion.g
                key="active"
                variants={opacityAnimation}
                initial="hide"
                animate="show"
                exit="hide"
              >
                <g id={`${name} Text`}>
                  {active.textPaths.map((p) => (
                    <g key={p.id} id={p.id}>
                      <path d={p.d} fill="white" />
                    </g>
                  ))}
                </g>

                <g id="See All Btn">
                  <rect
                    {...active.seeAllBtn.rectPaths}
                    fill="#BDE2C6"
                  />
                  <rect
                    {...active.seeAllBtn.rectPaths}
                    stroke="#57CF74"
                    strokeWidth={active.seeAllBtn.rectPaths.strokeWidth}
                  />
                  {active.seeAllBtn.othersPaths.map((p) => (
                    <path key={p.id} id={p.id} d={p.d} fill="black" />
                  ))}
                </g>

                <motion.g
                  id="Back Btn"
                  fill="transparent"
                  onClick={backBtnFunctions}
                  // Motion Attributes
                  variants={scaleAnimation}
                  whileHover="hover"
                >
                  <rect
                    {...active.backBtn.rect}
                    strokeWidth={active.backBtn.rect.strokeWidth}
                  />
                  <path id="Arrow 1" d={active.backBtn.arrowD} fill="white" />
                </motion.g>
              </motion.g>
            )}
          </AnimatePresence>
        );
      })}
    </>
  );
}