import { doc, updateDoc } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { db } from './firebase';
import { auth } from './auth';

// El paciente entra con Anonymous Auth: con esa sesión el PHP le crea su lead y después
// solo él puede subirle documentos (las reglas no le dejan ver los de nadie más).
export async function ensurePatientSession() {
  await auth.authStateReady();
  if (!auth.currentUser) await signInAnonymously(auth);
  return auth.currentUser;
}

// Anota en el lead los documentos que ya están en Hostinger. Con los tres, el caso queda completo
export async function saveLeadFiles(leadId, files) {
  const types = new Set(files.map((file) => file.type));
  await updateDoc(doc(db, 'insuranceLeads', leadId), {
    files,
    status: types.size === 3 ? 'complete' : 'incomplete',
  });
}
