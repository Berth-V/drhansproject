import { db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export async function testFirestoreConnection() {
  try {
    // Escribir un documento de prueba
    await setDoc(doc(db, 'test', 'conexion'), {
      mensaje: 'Firebase conectado correctamente',
      fecha: new Date().toISOString(),
    });

    // Leerlo de vuelta
    const snap = await getDoc(doc(db, 'test', 'conexion'));

    if (snap.exists()) {
      console.log('✅ Firestore conectado:', snap.data());
    }
  } catch (error) {
    console.error('❌ Error en Firestore:', error);
  }
}
