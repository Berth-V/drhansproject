import { motion, AnimatePresence } from 'motion/react';
import { partsData } from '../data/partsData';
import { useSkeletonContext } from '../context/useSkeletonContext';
import { opacityAnimation, scaleAnimation } from '../motionVariants/motionVariants';
export default function SkeletonManager() {
    const { selectedPart, circleFunctions, backBtnFunctions } = useSkeletonContext();

  return (
    <>
      {partsData.map((part) => {
      const { name, active = {}, default: def = {} } = part;
      const isActive = selectedPart === name;
      const titlePaths = Array.isArray(def.titlePaths) ? def.titlePaths : [];
      const textPaths  = Array.isArray(active.textPaths) ? active.textPaths : [];
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
                  {titlePaths.map((p) => (
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
                  {textPaths.map((p) => (
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
                {(() => {
                  const rect   = active?.backBtn?.rect ?? def?.backBtn?.rect ?? {};
                  const circle = active?.backBtn?.circle ?? def?.backBtn?.circle ?? null;
                  
                  const w  = Number(rect?.width)  || 0;
                  const h  = Number(rect?.height) || 0;
                  const x  = Number(rect?.x) || 0;
                  const y  = Number(rect?.y) || 0;
                  // fallback por si alguna parte aún no tiene .circle
                  const cx = circle?.cx ?? (x + w / 2);
                  const cy = circle?.cy ?? (y + h / 2);
                  const r  = circle?.r  ?? (Math.min(w, h) / 2);
                  const stroke      = circle?.stroke ?? rect?.stroke ?? 'white';
                  const strokeWidth = circle?.strokeWidth ?? rect?.strokeWidth ?? 0.6;
                  return (
                    <motion.g
                      id="Back Btn"
                      onClick={backBtnFunctions}
                      variants={scaleAnimation}
                      fill="transparent"
                      whileHover="hover"
                    >
                      <circle
                        cx={cx}
                        cy={cy}
                        r={r}
                        fill="transparent"
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                      />
                      <path
                        id="Arrow 1"
                        d={active?.backBtn?.arrowD ?? def?.backBtn?.arrowD ?? ''}
                        fill="white"
                      />
                    </motion.g>
                  );
                })()}
              </motion.g>
            )}
          </AnimatePresence>
        );
      })}
    </>
  );
}