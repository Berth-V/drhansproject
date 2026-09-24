import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { extractYoutubeId } from '../utils/youtube';

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
import RichTextEditor from './RichTextEditor';
import './PostForm.css';

const EMPTY_FORM = {
  title: '',
  slug: '',
  category: '',
  content: '',
  videoUrl: '',
  published: false,
  slugEdited: false,
};

const PostForm = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const isEditing = Boolean(postId);

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error | fetching
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isEditing) return;
    setStatus('fetching');
    getDoc(doc(db, 'posts', postId))
      .then((snap) => {
        if (!snap.exists()) {
          navigate('/admin');
          return;
        }
        const data = snap.data();
        setForm({
          title: data.title ?? '',
          slug: data.slug ?? '',
          category: data.category ?? '',
          content: data.content ?? '',
          videoUrl: data.videoUrl ?? '',
          published: data.published ?? false,
          slugEdited: true,
        });
        if (data.imageUrl) setImagePreview(data.imageUrl);
        setStatus('idle');
      })
      .catch(() => setStatus('error'));
  }, [postId, isEditing, navigate]);

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = 'El título es obligatorio';
    if (!form.slug.trim()) next.slug = 'El slug es obligatorio';
    else if (!/^[a-z0-9-]+$/.test(form.slug))
      next.slug = 'Solo minúsculas, números y guiones';
    if (!form.category.trim()) next.category = 'La categoría es obligatoria';
    if (!form.content.trim()) next.content = 'El contenido es obligatorio';
    return next;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const toSlug = (text) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: prev.slugEdited ? prev.slug : toSlug(value),
    }));
    if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
  };

  const handleSlugChange = (e) => {
    setForm((prev) => ({ ...prev, slug: e.target.value, slugEdited: true }));
    if (errors.slug) setErrors((prev) => ({ ...prev, slug: undefined }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', CLOUDINARY_PRESET);
    setUploadProgress(0);
    const res = await fetch(CLOUDINARY_URL, { method: 'POST', body: data });
    const json = await res.json();
    if (!res.ok) {
      console.error('Cloudinary error:', JSON.stringify(json));
      throw new Error(json?.error?.message ?? 'Cloudinary upload failed');
    }
    setUploadProgress(100);
    return json.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setStatus('loading');
    let imageUrl = imagePreview && !imageFile ? imagePreview : '';
    try {
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      const payload = {
        title: form.title,
        slug: form.slug,
        category: form.category,
        content: form.content,
        videoUrl: form.videoUrl,
        published: form.published,
        imageUrl,
      };
      if (isEditing) {
        await updateDoc(doc(db, 'posts', postId), payload);
      } else {
        await addDoc(collection(db, 'posts'), {
          ...payload,
          publishedAt: Timestamp.now(),
        });
      }
      setStatus('success');
      setTimeout(() => navigate('/admin'), 1500);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'fetching') {
    return (
      <div className="post-form-page">
        <p className="post-form-page__loading">Cargando artículo…</p>
      </div>
    );
  }

  return (
    <div className="post-form-page">
      <div className="post-form-page__header">
        <button className="post-form-page__back" onClick={() => navigate('/admin')}>
          ← Volver
        </button>
        <h1 className="post-form-page__title">
          {isEditing ? 'Editar artículo' : 'Nuevo artículo'}
        </h1>
      </div>

      <form className="post-form" onSubmit={handleSubmit} noValidate>
        <div className="post-form__field">
          <label htmlFor="title">Título</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleTitleChange}
            placeholder="Ej: Cuidados post operatorios"
          />
          {errors.title && <span className="post-form__error">{errors.title}</span>}
        </div>

        <div className="post-form__field">
          <label htmlFor="slug">Slug (URL — se genera automático)</label>
          <input
            id="slug"
            name="slug"
            value={form.slug}
            onChange={handleSlugChange}
            placeholder="Ej: cuidados-post-operatorios"
          />
          {errors.slug && <span className="post-form__error">{errors.slug}</span>}
        </div>

        <div className="post-form__field">
          <label htmlFor="category">Categoría</label>
          <input
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Ej: Cirugía, Alimentación…"
          />
          {errors.category && <span className="post-form__error">{errors.category}</span>}
        </div>

        <div className="post-form__field">
          <label>Contenido</label>
          <RichTextEditor
            value={form.content}
            onChange={(html) => {
              setForm((prev) => ({ ...prev, content: html }));
              if (errors.content) setErrors((prev) => ({ ...prev, content: undefined }));
            }}
          />
          {errors.content && <span className="post-form__error">{errors.content}</span>}
        </div>

        <div className="post-form__field">
          <label htmlFor="videoUrl">Video (link de YouTube, opcional)</label>
          <input
            id="videoUrl"
            name="videoUrl"
            value={form.videoUrl}
            onChange={handleChange}
            placeholder="Ej: https://www.youtube.com/watch?v=XXXXXXXXXXX"
          />
          {form.videoUrl && !extractYoutubeId(form.videoUrl) && (
            <span className="post-form__error">No se reconoce como link válido de YouTube</span>
          )}
        </div>

        <div className="post-form__field">
          <label>Imagen de portada</label>
          {imagePreview ? (
            <div className="post-form__image-preview">
              <img src={imagePreview} alt="Preview" />
              <button
                type="button"
                className="post-form__image-remove"
                onClick={handleRemoveImage}
              >
                Quitar imagen
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="post-form__image-pick"
              onClick={() => fileInputRef.current?.click()}
            >
              Seleccionar imagen
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          {imageFile && status === 'loading' && (
            <div className="post-form__progress">
              <div
                className="post-form__progress-bar"
                style={{ width: `${uploadProgress}%` }}
              />
              <span>{uploadProgress}%</span>
            </div>
          )}
        </div>

        <div className="post-form__field post-form__field--check">
          <label>
            <input
              type="checkbox"
              name="published"
              checked={form.published}
              onChange={handleChange}
            />
            Publicar inmediatamente
          </label>
        </div>

        {status === 'error' && (
          <p className="post-form__status post-form__status--error">
            Ocurrió un error al guardar. Intenta de nuevo.
          </p>
        )}
        {status === 'success' && (
          <p className="post-form__status post-form__status--success">
            {isEditing ? '¡Artículo actualizado!' : '¡Artículo guardado!'} Redirigiendo…
          </p>
        )}

        <button
          type="submit"
          className="post-form__submit"
          disabled={status === 'loading' || status === 'success'}
        >
          {status === 'loading'
            ? 'Guardando…'
            : isEditing
              ? 'Guardar cambios'
              : 'Guardar artículo'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;