import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOGS = path.join(__dirname, '../../dist/access.log');

const now = () => {
  const date = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  return date;
};

export default {
  log: async (message) => {
    const date = now();
    const logMessage = `[${date}] ✅ ${message}\n`;
    await fs.appendFile(LOGS, logMessage, 'utf8');
    console.log(logMessage.replace(/\n$/, ''));
  },

  error: async (error) => {
    const date = now();
    const errorMessage = `[${date}] ❌ ${error}\n`;
    await fs.appendFile(LOGS, errorMessage, 'utf8');
    console.error(errorMessage.replace(/\n$/, ''));
  },
};
