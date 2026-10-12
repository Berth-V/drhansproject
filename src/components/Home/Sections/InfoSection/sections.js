import herniaImg from '../../../../assets/hernia.jpg';
import jointReplacementImg from '../../../../assets/joint_replacement.png';
import arthroscopyImg from '../../../../assets/arthroscopy.png';
import sciaticaImg from '../../../../assets/sciatica.jpg';

// Secciones de texto + imagen del inicio, en el orden en que aparecen.
// `id` es la clave de sus textos en src/locales/*.json; para agregar, quitar o renombrar una sección solo se toca aquí y en los JSON.
export const INFO_SECTIONS = [
  { id: 'disc', image: herniaImg, imageSide: 'left' },
  { id: 'jointReplacement', image: jointReplacementImg },
  { id: 'arthroscopy', image: arthroscopyImg, imageSide: 'left' },
  { id: 'sciatica', image: sciaticaImg },
];
