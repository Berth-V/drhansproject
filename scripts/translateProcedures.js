import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import proceduresData from '../src/components/Procedures/data/proceduresData.js';
import OpenAI from 'openai';

// ===============================
// Resolver __dirname en ES Modules
// ===============================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===============================
// RUTA REAL AL PROYECTO
// ===============================
const ROOT_DIR = path.resolve(__dirname, '..');

const OUTPUT_DIR = path.join(
    ROOT_DIR,
    'src/components/Procedures/data'
);

const OUTPUT_FILE = path.join(
    OUTPUT_DIR,
    'proceduresData.es.js'
);

// ===============================
// Inicializar OpenAI
// ===============================
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// ===============================
async function translateText(text) {
    if (!text || typeof text !== 'string') return text;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `Traduce al español el siguiente texto sin modificarlo más allá de traducirlo:\n\n${text}`
                }
            ],
            temperature: 0
        });

        // La traducción se encuentra en content
        return response.choices[0].message.content.trim();
    } catch (err) {
        console.error('❌ Error traduciendo:', text, err.message);
        return text;
    }
}

async function translateProcedures(data) {
    const result = {};

    for (const [sectionKey, section] of Object.entries(data)) {
        result[sectionKey] = {
            ...section,
            injuries: [],
        };

        for (const injury of section.injuries) {
            const translatedTreatment = {};

            for (const [k, v] of Object.entries(injury.treatment)) {
                translatedTreatment[k] = await translateText(v);
            }

            result[sectionKey].injuries.push({
                ...injury,
                name: await translateText(injury.name),
                description: await translateText(injury.description),
                treatment: translatedTreatment,
            });
        }
    }

    return result;
}

(async () => {
    console.log('🌍 Traduciendo proceduresData usando OpenAI...');

    // Asegurar carpeta destino
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const translatedData = await translateProcedures(proceduresData);

    const output = `const proceduresData = ${JSON.stringify(
        translatedData,
        null,
        2
    )};\n\nexport default proceduresData;`;

    fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');

    console.log('✅ Archivo generado en:');
    console.log(OUTPUT_FILE);
})();
