import { motion, AnimatePresence } from 'motion/react';
import { getPartsData } from '../data';
import { useSkeletonContext } from '../context/useSkeletonContext';
import {
  opacityAnimation,
  scaleAnimation,
} from '../../../../Shared/motionVariants/motionVariants';
import { Link } from 'react-router-dom';
import { useRef, useLayoutEffect, useState } from 'react';
import proceduresData from '../../../../Procedures/data/proceduresData';

// Proporciones del botón "Ver Todo" respecto a la altura de su texto. Cada zona tiene un zoom
// distinto, así que medidas fijas (rx="1") se veían redondas en unas y cuadradas en otras.
const SEE_ALL_BTN = {
  paddingX: 0.65,
  paddingY: 0.45,
  radius: 0.35, // del alto del botón; mayor que la mitad del borde para que redondee por dentro
  stroke: 0.12, // del alto del botón
};

// Recuadro calculado a partir del texto: mismos márgenes, redondeo y borde en todos los botones
function SeeAllButton({ textPaths }) {
  const textRef = useRef(null);
  const [box, setBox] = useState(null);

  useLayoutEffect(() => {
    if (!textRef.current) return;
    const { x, y, width, height: textHeight } = textRef.current.getBBox();
    const paddingX = textHeight * SEE_ALL_BTN.paddingX;
    const paddingY = textHeight * SEE_ALL_BTN.paddingY;
    const height = textHeight + paddingY * 2;
    setBox({
      x: x - paddingX,
      y: y - paddingY,
      width: width + paddingX * 2,
      height,
      rx: height * SEE_ALL_BTN.radius,
      strokeWidth: height * SEE_ALL_BTN.stroke,
    });
  }, [textPaths]);

  return (
    <>
      {box && (
        <rect
          x={box.x}
          y={box.y}
          width={box.width}
          height={box.height}
          rx={box.rx}
          ry={box.rx}
          fill="#00C4FF"
          stroke="#075985"
          strokeWidth={box.strokeWidth}
        />
      )}
      <g ref={textRef}>
        {textPaths.map((p) => (
          <path key={p.id} id={p.id} d={p.d} fill="white" />
        ))}
      </g>
    </>
  );
}

export default function SkeletonManager() {
  const partsData = getPartsData();
  const { selectedPart, circleFunctions, backBtnFunctions, zoomToContent } =
    useSkeletonContext();

  const activePart = partsData.find((p) => p.name === selectedPart);
  const inactiveParts = partsData.filter((p) => p.name !== selectedPart);

  // Map to id Route Link
  const titleToIdMap = Object.fromEntries(
    Object.entries(proceduresData).map(([id, part]) => [part.title, id])
  );

  const activeGroupRef = useRef(null);

  useLayoutEffect(() => {
    if (activePart && activeGroupRef.current) {
      const bbox = activeGroupRef.current.getBBox();
      const padding = 20;
      zoomToContent(
        bbox.x - padding,
        bbox.y - padding,
        bbox.width + padding * 2,
        bbox.height + padding * 2
      );
    }
  }, [activePart, zoomToContent]);

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
          ref={activeGroupRef}
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
                {/* See All Btn */}
                {linkId && (
                  <Link to={`/procedures/${linkId}`}>
                    <motion.g
                      id="See All Btn"
                      variants={opacityAnimation}
                      whileHover={{ scale: 1.05 }}
                      style={{ cursor: 'pointer' }}
                    >
                      <SeeAllButton textPaths={active.seeAllBtn.othersPaths ?? []} />
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
