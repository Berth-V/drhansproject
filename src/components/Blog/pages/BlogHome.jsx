import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { db } from '../../../firebase/firebase';
import { fadeUpVariant } from '../../Shared/motionVariants/motionVariants';
import PostCard from '../components/PostCard';
import Reviews from '../../Shared/Reviews/Reviews';
import './BlogHome.css';

const POSTS_PER_PAGE = 6;

const BlogHome = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [errorPosts, setErrorPosts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [loadingQ, setLoadingQ] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'posts'));
        const allPosts = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => (b.publishedAt?.seconds ?? 0) - (a.publishedAt?.seconds ?? 0));
        setPosts(allPosts);
      } catch (err) {
        console.error('Firestore error:', err);
        setErrorPosts(err);
      } finally {
        setLoadingPosts(false);
      }
    };

    const fetchQuestions = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'questions'));
        const answered = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((q) => q.answer)
          .sort((a, b) => (b.answeredAt?.seconds ?? 0) - (a.answeredAt?.seconds ?? 0));
        setAnsweredQuestions(answered);
      } catch (err) {
        console.error('Questions error:', err);
      } finally {
        setLoadingQ(false);
      }
    };

    fetchPosts();
    fetchQuestions();
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pagePosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <section className="blog-home">
      <div className="blog-home__header">
        <p className="blog-home__eyebrow">Dr. Hans Ruiz</p>
        <motion.h1 className="blog-home__title" {...fadeUpVariant}>
          {t('blog.title')}
        </motion.h1>
        <motion.p className="blog-home__subtitle" {...fadeUpVariant}>
          {t('blog.subtitle')}
        </motion.p>
      </div>

      <div className="blog-home__content">
        {loadingPosts && (
          <div className="blog-home__state">
            <p>{t('blog.loading')}</p>
          </div>
        )}

        {!loadingPosts && errorPosts && (
          <div className="blog-home__state">
            <p>{t('blog.error')}</p>
          </div>
        )}

        {!loadingPosts && !errorPosts && posts.length === 0 && (
          <div className="blog-home__state">
            <p>{t('blog.empty')}</p>
          </div>
        )}

        {!loadingPosts && !errorPosts && posts.length > 0 && (
          <>
            <div className="blog-home__grid">
              {pagePosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="blog-home__pagination">
                <button
                  className="blog-home__page-btn"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  {t('blog.pagination.prev')}
                </button>

                <span className="blog-home__page-info">
                  {t('blog.pagination.page', { current: currentPage, total: totalPages })}
                </span>

                <button
                  className="blog-home__page-btn"
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  {t('blog.pagination.next')}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Preguntas respondidas */}
      <div className="blog-home__qa">
        <div className="blog-home__qa-header">
          <p className="blog-home__eyebrow">{t('blog.answeredQuestions.title')}</p>
          <p className="blog-home__qa-subtitle">{t('blog.answeredQuestions.subtitle')}</p>
        </div>

        {loadingQ && (
          <p className="blog-home__qa-state">{t('blog.answeredQuestions.loading')}</p>
        )}

        {!loadingQ && answeredQuestions.length === 0 && (
          <p className="blog-home__qa-state">{t('blog.answeredQuestions.empty')}</p>
        )}

        {!loadingQ && answeredQuestions.length > 0 && (
          <div className="blog-home__qa-list">
            {answeredQuestions.map((item) => (
              <div key={item.id} className="blog-home__qa-item">
                <p className="blog-home__qa-question">
                  <span className="blog-home__qa-label">Q</span>
                  {item.question}
                </p>
                <p className="blog-home__qa-answer">
                  <span className="blog-home__qa-label blog-home__qa-label--doc">A</span>
                  {item.answer}
                </p>
                <p className="blog-home__qa-author">— {item.name}</p>
              </div>
            ))}
          </div>
        )}

        <div className="blog-home__qa-cta">
          <p>{t('blog.answeredQuestions.askCta')}</p>
          <Link to="/preguntas" className="blog-home__qa-btn">
            {t('blog.answeredQuestions.askBtn')}
          </Link>
        </div>
      </div>

      <Reviews />
    </section>
  );
};

export default BlogHome;
