import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { db } from '../../../firebase/firebase';
import { fadeUpVariant } from '../../Shared/motionVariants/motionVariants';
import { extractYoutubeId } from '../utils/youtube';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const q = query(
          collection(db, 'posts'),
          where('slug', '==', slug),
          limit(1)
        );
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
          setNotFound(true);
        } else {
          setPost({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatContent = (raw) => {
    if (!raw) return '';
    // If content has no HTML tags it was saved as plain text — convert to paragraphs
    if (!/<[a-z][\s\S]*>/i.test(raw)) {
      return raw
        .split(/\n{2,}/)
        .map((block) => `<p>${block.replace(/\n/g, '<br>')}</p>`)
        .filter((p) => p !== '<p></p>')
        .join('');
    }
    return raw;
  };

  const dateLocale = i18n.language === 'es' ? 'es-MX' : 'en-US';
  const date = post?.publishedAt?.toDate
    ? post.publishedAt.toDate().toLocaleDateString(dateLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : '';

  const videoId = extractYoutubeId(post?.videoUrl);

  if (loading) {
    return (
      <div className="blog-post blog-post--state">
        <p>{t('blog.post.loading')}</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="blog-post blog-post--state">
        <p>{t('blog.post.notFound')}</p>
        <Link to="/blog" className="blog-post__back">
          {t('blog.post.back')}
        </Link>
      </div>
    );
  }

  return (
    <article className="blog-post">
      <div className="blog-post__container">
        <Link to="/blog" className="blog-post__back">
          {t('blog.post.back')}
        </Link>

        <motion.header className="blog-post__header" {...fadeUpVariant}>
          {post.category && (
            <span className="blog-post__category">{post.category}</span>
          )}
          <h1 className="blog-post__title">{post.title}</h1>
          {date && <time className="blog-post__date">{date}</time>}
        </motion.header>

        {post.imageUrl && (
          <div className="blog-post__img-wrap">
            <img src={post.imageUrl} alt={post.title} className="blog-post__img" />
          </div>
        )}

        {videoId && (
          <div className="blog-post__video-wrap">
            <iframe
              className="blog-post__video"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={post.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        <motion.div
          className="blog-post__content"
          {...fadeUpVariant}
          viewport={{ once: true, amount: 0.05 }}
          dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
        />
      </div>
    </article>
  );
};

export default BlogPost;