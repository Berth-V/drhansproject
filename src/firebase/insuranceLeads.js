import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { db } from './firebase';
import { auth } from './auth';
import { SITE_CONFIG } from '../config/siteConfig';

// El paciente entra con Anonymous Auth: las reglas de Firestore lo dejan crear su lead
// (y después actualizar sus archivos) sin poder leer los de nadie más.
async function getPatientUid() {
  await auth.authStateReady();
  if (auth.currentUser) return auth.currentUser.uid;
  const { user } = await signInAnonymously(auth);
  return user.uid;
}

// Crea insuranceLeads/{leadId} con los datos del paso 1 y devuelve el id
export async function createInsuranceLead(form) {
  const ownerUid = await getPatientUid();
  const isOther = form.insurer === 'other';

  const leadRef = await addDoc(collection(db, 'insuranceLeads'), {
    name: form.name.trim(),
    whatsapp: form.whatsapp.replace(/\D/g, ''), // solo dígitos, para armar el enlace de WhatsApp en el panel
    insurer: form.insurer,
    insurerOther: isOther ? form.insurerOther.trim() : '',
    policy: form.policy.trim(),
    diagnosis: form.diagnosis.trim(),
    consent: true,
    consentAt: serverTimestamp(),
    status: 'incomplete',
    files: [],
    site: SITE_CONFIG.id,
    ownerUid,
    createdAt: serverTimestamp(),
  });

  return leadRef.id;
}
