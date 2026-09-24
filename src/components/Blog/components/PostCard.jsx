import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import './PostCard.css';

const PostCard = ({ post }) => {
  const { i18n } = useTranslation();
  const dateLocale = i18n.language === 'es' ? 'es-MX' : 'en-US';
  const date = post.publishedAt?.toDate
    ? post.publishedAt.toDate().toLocaleDateString(dateLocale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <motion.article
      className="post-card"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link to={`/blog/${post.slug}`} className="post-card__link">
        {post.imageUrl && (
          <div className="post-card__img-wrap">
            <img src={post.imageUrl} alt={post.title} className="post-card__img" />
          </div>
        )}
        <div className="post-card__body">
          <div className="post-card__meta">
            {post.category && (
              <span className="post-card__category">{post.category}</span>
            )}
            {date && <time className="post-card__date">{date}</time>}
          </div>
          <h2 className="post-card__title">{post.title}</h2>
          {post.summary && (
            <p className="post-card__summary">{post.summary}</p>
          )}
        </div>
      </Link>
    </motion.article>
  );
};

export default PostCard;
