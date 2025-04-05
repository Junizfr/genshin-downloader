import fs from 'fs';
import path from 'path';

export default {
  setup: () => {
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist');
    }
    if (!fs.existsSync('dist/characters')) {
      fs.mkdirSync('dist/characters');
    }
  },

  read: (path) => {
    const filePath = `dist/${path}`;
    const data = fs.readFileSync(filePath, 'utf-8');
    return data;
  },

  write: (file, data) => {
    let filePath = `dist/${file}`;

    // Si le fichier commence par 'characters', on évite de le placer dans 'dist/characters/'
    if (file.startsWith('characters/')) {
      filePath = path.join('dist', file); // Place dans dist sans 'characters/'
    } else {
      // Si ce n'est pas un fichier 'characters', on le place directement dans dist
      filePath = path.join('dist', file);
    }

    return fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  },
};
