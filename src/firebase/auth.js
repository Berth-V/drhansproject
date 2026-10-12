import { getAuth } from 'firebase/auth';
import { app } from './firebase';

// Separado de firebase.js para que las páginas públicas (blog, procedimientos) no descarguen Firebase Auth
export const auth = getAuth(app);
