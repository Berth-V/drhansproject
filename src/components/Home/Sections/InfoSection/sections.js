import herniaImg from '../../../../assets/hernia.webp';
import jointReplacementImg from '../../../../assets/joint_replacement.webp';
import arthroscopyImg from '../../../../assets/arthroscopy.webp';
import sciaticaImg from '../../../../assets/sciatica.webp';

// Secciones de texto + imagen del inicio, en el orden en que aparecen.
// `id` es la clave de sus textos en src/locales/*.json; para agregar, quitar o renombrar una sección solo se toca aquí y en los JSON.
// La imagen alterna de lado; MinimallyInvasive (antes de estas) la lleva a la izquierda.
export const INFO_SECTIONS = [
  { id: 'disc', image: herniaImg },
  { id: 'jointReplacement', image: jointReplacementImg, imageSide: 'left' },
  { id: 'arthroscopy', image: arthroscopyImg },
  { id: 'sciatica', image: sciaticaImg, imageSide: 'left' },
];
