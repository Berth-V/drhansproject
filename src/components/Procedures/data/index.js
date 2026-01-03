import proceduresES from './proceduresData.es.js';
import proceduresEN from './proceduresData';
import i18n from '../../../i18n.js';

export function getProceduresData() {
    const lang = i18n.language.startsWith('es') ? 'es' : 'en';
    return lang === 'es' ? proceduresES : proceduresEN;
}