import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { db } from '../../../firebase/firebase';
import { SITE_CONFIG, BLOG_CANONICAL_DOMAIN } from '../../../config/siteConfig';
import { SITES } from '../../../config/sites';
import Seo from '../../Shared/Seo/Seo';
import { fadeUpVariant } from '../../Shared/motionVariants/motionVariants';
import { extractYoutubeId } from '../utils/youtube';
import { getProceduresData } from '../../Procedures/data';
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
        // Los borradores no son públicos
        if (snapshot.empty || snapshot.docs[0].data().published === false) {
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
    if (!/<[a-z][\s\S]*>/i.test(raw)) {
      return raw
        .split(/\n{2,}/)
        .map((block) => `<p>${block.replace(/\n/g, '<br>')}</p>`)
        .filter((p) => p !== '<p></p>')
        .join('');
    }
    return raw;
  };

  const getMetaDescription = (content) => {
    if (!content) return '';
    // DOMParser quita las etiquetas y convierte entidades como &nbsp; o &amp;
    const doc = new DOMParser().parseFromString(content.replace(/</g, ' <'), 'text/html');
    const plainText = (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim();
    return plainText.length > 155 ? plainText.slice(0, 155).trim() + '…' : plainText;
  };

  const dateLocale = i18n.language === 'es' ? 'es-MX' : 'en-US';
  const date = post?.publishedAt?.toDate
    ? post.publishedAt.toDate().toLocaleDateString(dateLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : '';

  const isoDate = post?.publishedAt?.toDate
    ? post.publishedAt.toDate().toISOString()
    : '';

  const videoId = extractYoutubeId(post?.videoUrl);

  // Título legible de la parte relacionada, si existe
  const relatedPartTitle = post?.relatedPart
    ? getProceduresData()[post.relatedPart]?.title
    : null;

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

  const metaDescription = getMetaDescription(post.content);
  const postPath = `/blog/${post.slug}`;
  // Los artículos están en español: el sitio en inglés solo traduce la interfaz
  const isTranslatedSite = SITE_CONFIG.language !== 'es';

  return (
    <article className="blog-post">
      <Seo
        title={`${post.title} | ${t('seo.blogPost.titleSuffix')}`}
        description={metaDescription}
        path={postPath}
        canonicalDomain={BLOG_CANONICAL_DOMAIN}
        alternates={false}
        locale={SITES.mx.ogLocale}
        type="article"
        image={post.imageUrl}
      >
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalWebPage',
            headline: post.title,
            description: metaDescription,
            url: `${BLOG_CANONICAL_DOMAIN}${postPath}`,
            inLanguage: 'es',
            ...(isoDate && { datePublished: isoDate }),
            ...(post.imageUrl && { image: post.imageUrl }),
            author: {
              '@type': 'Physician',
              name: 'Dr. Hans Ruiz Serna',
              url: BLOG_CANONICAL_DOMAIN,
            },
            publisher: {
              '@type': 'Physician',
              name: 'Dr. Hans Ruiz Serna',
            },
          })}
        </script>
      </Seo>

      <div className="blog-post__container" lang={isTranslatedSite ? 'es' : undefined}>
        <Link to="/blog" className="blog-post__back" lang={SITE_CONFIG.language}>
          {t('blog.post.back')}
        </Link>

        {isTranslatedSite && (
          <p className="blog-post__language-note" lang={SITE_CONFIG.language}>
            {t('blog.post.languageNote')}
          </p>
        )}

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

        {relatedPartTitle && (
          <div className="blog-post__related" lang={SITE_CONFIG.language}>
            <p className="blog-post__related-label">{t('blog.post.relatedLabel')}</p>
            <Link
              to={`/procedures/${post.relatedPart}`}
              className="blog-post__related-link"
            >
              {t('blog.post.relatedLink', { part: relatedPartTitle })}
            </Link>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogPost;