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
    if (!fs.existsSync('dist/characters/images')) {
      fs.mkdirSync('dist/characters/images');
    }
    if (!fs.existsSync('dist/weapons')) {
      fs.mkdirSync('dist/weapons');
    }
    if (!fs.existsSync('dist/weapons/images')) {
      fs.mkdirSync('dist/weapons/images');
    }
  },

  read: (path) => {
    const filePath = `dist/${path}`;
    const data = fs.readFileSync(filePath, 'utf-8');
    return data;
  },

  write: (file, data) => {
    let filePath = `dist/${file}`;

    if (!file.startsWith('dist/')) {
      filePath = path.join('dist', file);
    } else {
      filePath = path.join('dist', file);
    }

    return fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  },
};
