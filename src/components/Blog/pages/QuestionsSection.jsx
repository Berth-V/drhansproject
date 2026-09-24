import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import './QuestionsSection.css';

function QuestionsSection() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !question.trim()) return;

    setStatus('sending');
    try {
      await addDoc(collection(db, 'questions'), {
        name: name.trim(),
        question: question.trim(),
        answer: null,
        answeredAt: null,
        published: false,
        createdAt: serverTimestamp(),
      });

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { name: name.trim(), message: question.trim() },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      setName('');
      setQuestion('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="questions">
      <div className="questions__container">
        <h2 className="questions__title">{t('questions.title')}</h2>
        <p className="questions__subtitle">{t('questions.subtitle')}</p>

        {status === 'success' ? (
          <div className="questions__success">
            <p>{t('questions.success')}</p>
            <button
              className="questions__btn-reset"
              onClick={() => setStatus('idle')}
            >
              {t('questions.another')}
            </button>
          </div>
        ) : (
          <form className="questions__form" onSubmit={handleSubmit}>
            <div className="questions__field">
              <label htmlFor="q-name">{t('questions.nameLabel')}</label>
              <input
                id="q-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('questions.namePlaceholder')}
                required
                disabled={status === 'sending'}
              />
            </div>

            <div className="questions__field">
              <label htmlFor="q-question">{t('questions.questionLabel')}</label>
              <textarea
                id="q-question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={t('questions.questionPlaceholder')}
                rows={5}
                required
                disabled={status === 'sending'}
              />
            </div>

            {status === 'error' && (
              <p className="questions__error">{t('questions.error')}</p>
            )}

            <button
              type="submit"
              className="questions__btn-submit"
              disabled={status === 'sending'}
            >
              {status === 'sending'
                ? t('questions.sending')
                : t('questions.submit')}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default QuestionsSection;
