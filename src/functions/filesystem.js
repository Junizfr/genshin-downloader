import fs from 'fs';

export default {
  setup: () => {
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist');
    }
  },

  read: (path) => {
    const data = fs.readFileSync(path, 'utf-8');
    return data;
  },

  write: (path, data) => {
    const filePath = `dist/${path}`;
    return fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  },
};
