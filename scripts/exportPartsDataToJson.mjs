console.log('SCRIPT STARTED');

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Ajusta esta ruta
import { partsData } from '../src/components/Home/Sections/Skeleton/data/partsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(
    __dirname,
    '../src/components/Home/Sections/Skeleton/data/partsData.json'
);

// Limpieza automática (quita undefined)
const clean = JSON.parse(JSON.stringify(partsData));

fs.writeFileSync(outputPath, JSON.stringify(clean, null, 2), 'utf-8');

console.log('✅ partsData_es.json generado correctamente');
