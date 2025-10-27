import { motion, AnimatePresence } from 'motion/react';
import { partsData } from '../data/partsData';
import { useSkeletonContext } from '../context/useSkeletonContext';
import {
  opacityAnimation,
  scaleAnimation,
} from '../../../../Shared/motionVariants/motionVariants';
import { Link } from 'react-router-dom';
import proceduresData from '../../../../Procedures/data/proceduresData';

export default function SkeletonManager() {
  const { selectedPart, circleFunctions, backBtnFunctions } =
    useSkeletonContext();

  const activePart = partsData.find((p) => p.name === selectedPart);
  const inactiveParts = partsData.filter((p) => p.name !== selectedPart);

  // Map to id Route Link
  const titleToIdMap = Object.fromEntries(
    Object.entries(proceduresData).map(([id, part]) => [part.title, id])
  );

  return (
    <AnimatePresence initial={false}>
      {/* Inactive Parts (Default) */}
      {!activePart &&
        inactiveParts.map((part) => {
          const { name, default: def = {} } = part;
          const titlePaths = Array.isArray(def.titlePaths)
            ? def.titlePaths
            : [];

          return (
            <motion.g
              key={`${name}-inactive`}
              variants={opacityAnimation}
              initial="show"
              animate="show"
              exit="hide"
            >
              {/* Clickable Circle */}
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
                variants={scaleAnimation}
                whileHover="hover"
              />

              {/* Line */}
              <motion.path
                id={`${name} Line`}
                d={def.lineProps?.d ?? ''}
                stroke="#F5F5F5"
                strokeWidth={2}
                variants={opacityAnimation}
                initial="show"
                exit="hide"
              />

              {/* Title */}
              <motion.g
                key={`${name}-title-group`}
                id={`${name} Title`}
                variants={opacityAnimation}
              >
                {titlePaths.map((p) => (
                  <motion.path
                    key={p.id}
                    id={p.id}
                    d={p.d}
                    fill="white"
                    variants={opacityAnimation}
                  />
                ))}
              </motion.g>
            </motion.g>
          );
        })}

      {/* Active Part */}
      {activePart && (
        <motion.g
          key={`${activePart.name}-active`}
          variants={opacityAnimation}
          initial="hide"
          animate="show"
          exit="hide"
        >
          {(() => {
            const { name, active = {}, default: def = {} } = activePart;
            const textPaths = Array.isArray(active.textPaths)
              ? active.textPaths
              : [];

            const linkId = titleToIdMap[activePart.name]; // Dinamic id Routes

            return (
              <>
                {/* Active Text */}
                <motion.g id={`${name} Text`} variants={opacityAnimation}>
                  {textPaths.map((p) => (
                    <motion.path
                      key={p.id}
                      id={p.id}
                      d={p.d}
                      fill="white"
                      variants={opacityAnimation}
                    />
                  ))}
                </motion.g>

                {/* Dinamic Routes to Procedures */}
                {linkId && (
                  <Link to={`/procedures/${linkId}`}>
                    <motion.g
                      id="See All Btn"
                      variants={opacityAnimation}
                      whileHover={{ scale: 1.05 }}
                      style={{ cursor: 'pointer' }}
                    >
                      <rect
                        {...active.seeAllBtn.rectPaths}
                        fill="#00C4FF"
                        rx="1"
                        ry="1"
                      />
                      <rect
                        {...active.seeAllBtn.rectPaths}
                        stroke="#075985"
                        strokeWidth={active.seeAllBtn.rectPaths.strokeWidth}
                        rx="1"
                      />
                      {active.seeAllBtn.othersPaths?.map((p) => (
                        <path key={p.id} id={p.id} d={p.d} fill="black" />
                      ))}
                    </motion.g>
                  </Link>
                )}

                {/* Back Btn */}
                {(() => {
                  const circle = active?.backBtn?.circle ?? {};
                  const cx = circle?.cx ?? def.cx ?? 0;
                  const cy = circle?.cy ?? def.cy ?? 0;
                  const r = circle?.r ?? def.r ?? 5;
                  const stroke = circle?.stroke ?? 'white';
                  const strokeWidth = circle?.strokeWidth ?? 0.6;

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
                        d={
                          active?.backBtn?.arrowD ?? def?.backBtn?.arrowD ?? ''
                        }
                        fill="white"
                      />
                    </motion.g>
                  );
                })()}
              </>
            );
          })()}
        </motion.g>
      )}
    </AnimatePresence>
  );
}
