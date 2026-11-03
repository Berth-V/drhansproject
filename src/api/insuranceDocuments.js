import { auth } from '../firebase/auth';

// Endpoint PHP en Hostinger (public/api). En local, vite.config.js lo manda a hansruiztrauma.com.mx
const UPLOAD_URL = '/api/insurance-upload.php';

// Fotos grandes del celular: se reducen antes de subirlas (los PDF y HEIC van tal cual)
const COMPRESS_FROM = 1.5 * 1024 * 1024;
const MAX_DIMENSION = 2400;
const JPEG_QUALITY = 0.82;

async function compressImage(file) {
  if (!['image/jpeg', 'image/png'].includes(file.type) || file.size < COMPRESS_FROM) return file;

  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);

    const context = canvas.getContext('2d');
    context.fillStyle = '#fff'; // los PNG transparentes quedan con fondo blanco
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.jpg', { type: 'image/jpeg' });
  } catch {
    return file;
  }
}

// Sube un documento del lead y devuelve sus datos ({ type, id, name, size, mime }).
// Si falla, lanza un Error con el código del servidor (file_size, file_type, rate_limited…)
export async function uploadInsuranceDocument(leadId, type, file) {
  const token = await auth.currentUser.getIdToken();
  const body = new FormData();
  body.append('leadId', leadId);
  body.append('type', type);
  body.append('file', await compressImage(file));

  const response = await fetch(UPLOAD_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.file) throw new Error(data.error || `http_${response.status}`);
  return data.file;
}
