import { motion, AnimatePresence } from 'motion/react';
import { partsData } from '../data/partsData';
import { useSkeletonContext } from '../context/useSkeletonContext';
import { opacityAnimation, scaleAnimation } from '../motionVariants/motionVariants';

export default function SkeletonManager() {
  const { selectedPart, circleFunctions, backBtnFunctions } = useSkeletonContext();

  const activePart = partsData.find((p) => p.name === selectedPart);
  const inactiveParts = partsData.filter((p) => p.name !== selectedPart);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {/* 🦴 Mostrar partes inactivas (solo cuando no hay parte activa) */}
      {!activePart && (
        <>
          {inactiveParts.map((part) => {
            const { name, default: def = {} } = part;
            const titlePaths = Array.isArray(def.titlePaths) ? def.titlePaths : [];

            return (
              <motion.g
                key={name}
                variants={opacityAnimation}
                initial="show"
                exit="hide"
              >
                {/* Círculo clickable */}
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

                {/* Línea de la parte */}
                <motion.path
                  id={`${name} Line`}
                  d={def.lineProps.d}
                  stroke="#F5F5F5"
                  strokeWidth={2}
                  variants={opacityAnimation}
                  initial="show"
                  exit="hide"
                />

                {/* Título de la parte */}
                <motion.g
                  key={`${name}-tittle`}
                  id={`${name} Tittle`}
                  variants={opacityAnimation}
                  initial="show"
                  exit="hide"
                >
                  {titlePaths.map((p) => (
                    <path key={p.id} id={p.id} d={p.d} fill="white" />
                  ))}
                </motion.g>
              </motion.g>
            );
          })}
        </>
      )}

      {/* 🧩 Mostrar parte activa (cuando se hace zoom o selección) */}
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

            return (
              <>
                {/* Texto o contenido activo */}
                <g id={`${name} Text`}>
                  {textPaths.map((p) => (
                    <g key={p.id} id={p.id}>
                      <path d={p.d} fill="white" />
                    </g>
                  ))}
                </g>

                {/* Botón "See All" */}
                <g id="See All Btn">
                  <rect {...active.seeAllBtn.rectPaths} fill="#BDE2C6" />
                  <rect
                    {...active.seeAllBtn.rectPaths}
                    stroke="#57CF74"
                    strokeWidth={active.seeAllBtn.rectPaths.strokeWidth}
                  />
                  {active.seeAllBtn.othersPaths.map((p) => (
                    <path key={p.id} id={p.id} d={p.d} fill="black" />
                  ))}
                </g>

                {/* Botón de regresar */}
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
                        d={active?.backBtn?.arrowD ?? def?.backBtn?.arrowD ?? ''}
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
