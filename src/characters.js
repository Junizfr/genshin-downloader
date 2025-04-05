import app from './app.js';
import api from './functions/api.js';
import filesystem from './functions/filesystem.js';

export default {
  downloads: async () => {
    const characters = JSON.parse(filesystem.read('characters.json'));

    for (const character of characters) {
      const data = await api.get(`${app.queryURL}${character}`);
      filesystem.write(`characters/${character}.json`, data);
    }
  },
};
