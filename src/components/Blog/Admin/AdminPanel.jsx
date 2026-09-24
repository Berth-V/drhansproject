import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../firebase/firebase';
import './AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [questions, setQuestions] = useState([]);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [answerDraft, setAnswerDraft] = useState({});
  const [savingAnswer, setSavingAnswer] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const snap = await getDocs(
        query(collection(db, 'posts'), orderBy('publishedAt', 'desc'))
      );
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };
    fetchPosts();

    const fetchQuestions = async () => {
      const snap = await getDocs(
        query(collection(db, 'questions'), orderBy('createdAt', 'desc'))
      );
      const qs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setQuestions(qs);
      const drafts = {};
      qs.forEach((q) => { drafts[q.id] = q.answer || ''; });
      setAnswerDraft(drafts);
      setQuestionsLoading(false);
    };
    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'posts', id));
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setConfirmDelete(null);
  };

  const handleSaveAnswer = async (qId) => {
    setSavingAnswer(qId);
    await updateDoc(doc(db, 'questions', qId), {
      answer: answerDraft[qId],
      answeredAt: serverTimestamp(),
    });
    setQuestions((prev) =>
      prev.map((q) => q.id === qId ? { ...q, answer: answerDraft[qId] } : q)
    );
    setSavingAnswer(null);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel__header">
        <div>
          <h1 className="admin-panel__title">
            Panel <span>Dr. Hans</span>
          </h1>
          <p className="admin-panel__subtitle">Bienvenido, doctor</p>
        </div>
        <button className="admin-panel__logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      <div className="admin-panel__body">
        <div className="admin-panel__top">
          <h2 className="admin-panel__section-title">Artículos</h2>
          <button
            className="admin-panel__new-btn"
            onClick={() => navigate('/admin/new')}
          >
            + Nuevo artículo
          </button>
        </div>

        {loading ? (
          <p className="admin-panel__empty">Cargando artículos…</p>
        ) : posts.length === 0 ? (
          <p className="admin-panel__empty">Aún no hay artículos publicados.</p>
        ) : (
          <ul className="admin-panel__list">
            {posts.map((post) => (
              <li key={post.id} className="admin-panel__item">
                <div className="admin-panel__item-info">
                  <span className="admin-panel__item-title">{post.title}</span>
                  <span className="admin-panel__item-meta">
                    {post.category && (
                      <span className="admin-panel__item-category">{post.category}</span>
                    )}
                    <span
                      className={`admin-panel__item-status ${post.published ? 'admin-panel__item-status--published' : ''
                        }`}
                    >
                      {post.published ? 'Publicado' : 'Borrador'}
                    </span>
                  </span>
                </div>
                <div className="admin-panel__actions">
                  <button
                    className="admin-panel__edit-btn"
                    onClick={() => navigate(`/admin/edit/${post.id}`)}
                  >
                    Editar
                  </button>
                  {confirmDelete === post.id ? (
                    <div className="admin-panel__confirm">
                      <span>¿Eliminar?</span>
                      <button
                        className="admin-panel__confirm-yes"
                        onClick={() => handleDelete(post.id)}
                      >
                        Sí
                      </button>
                      <button
                        className="admin-panel__confirm-no"
                        onClick={() => setConfirmDelete(null)}
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      className="admin-panel__delete-btn"
                      onClick={() => setConfirmDelete(post.id)}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="admin-panel__body">
        <div className="admin-panel__top">
          <h2 className="admin-panel__section-title">Preguntas de pacientes</h2>
        </div>

        {questionsLoading ? (
          <p className="admin-panel__empty">Cargando preguntas…</p>
        ) : questions.length === 0 ? (
          <p className="admin-panel__empty">Aún no hay preguntas.</p>
        ) : (
          <ul className="admin-panel__list">
            {questions.map((q) => (
              <li key={q.id} className="admin-panel__question-item">
                <div className="admin-panel__question-meta">
                  <span className="admin-panel__question-name">{q.name}</span>
                  {q.answer && (
                    <span className="admin-panel__question-answered">Respondida</span>
                  )}
                </div>
                <p className="admin-panel__question-text">{q.question}</p>
                <textarea
                  className="admin-panel__answer-input"
                  rows={3}
                  placeholder="Escribe tu respuesta…"
                  value={answerDraft[q.id] ?? ''}
                  onChange={(e) =>
                    setAnswerDraft((prev) => ({ ...prev, [q.id]: e.target.value }))
                  }
                />
                <button
                  className="admin-panel__answer-btn"
                  disabled={savingAnswer === q.id || !answerDraft[q.id]?.trim()}
                  onClick={() => handleSaveAnswer(q.id)}
                >
                  {savingAnswer === q.id ? 'Guardando…' : 'Guardar respuesta'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
