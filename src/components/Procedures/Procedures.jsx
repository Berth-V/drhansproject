import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { getProceduresData } from './data';
import { procedureCard } from '../Shared/motionVariants/motionVariants';
import { useTranslation } from 'react-i18next';
import './Procedures.css';

const icons = import.meta.glob('/src/assets/procedures_icons/*.png', {
  eager: true,
});

const Procedures = () => {
  const proceduresData = getProceduresData();
  const parts = Object.entries(proceduresData);
  const { t } = useTranslation();

  return (
    <section className="procedures">
      <h2 className="procedures__title">{t('procedures.title')}</h2> {/* <--- i18n */}
      <motion.div
        className="procedures__grid"
        variants={procedureCard}
        initial="hidden"
        animate="visible"
      >
        {parts.map(([id, part]) => {
          const icon = icons[`/src/assets/procedures_icons/${id}.png`];

          return (
            <motion.div
              key={id}
              className="procedures__card"
              variants={procedureCard}
            >
              <Link to={`/procedures/${id}`} className="procedures__card-link">
                <div className="procedures__card-icon">
                  {icon ? (
                    <img
                      src={icon.default}
                      alt={part.title}
                      className="procedures__card-img"
                    />
                  ) : (
                    <span className="procedures__card--missing-icon">❓</span>
                  )}
                </div>

                <div className="procedures__card-body">
                  <h3 className="procedures__card-name">{part.title}</h3>
                  <p className="procedures__card-description">
                    {part.injuries.length} {t('procedures.injuriesAndTreatments')}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Procedures;
