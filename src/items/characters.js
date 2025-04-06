import api from '../functions/api.js';
import downloader from '../functions/downloader.js';
import filesystem from '../functions/filesystem.js';
import logger from '../utils/logger.js';

export default {
  downloads: async () => {
    const characters = JSON.parse(filesystem.read('characters.json'));

    let count = 0;

    for (const character of characters) {
      const data = await api.get(
        `${process.env.GENSHIN_CHARACTERS_QUERY}${character}`
      );

      if (data.images && data.images.cover1) {
        const url = data.images.cover1;
        const filename = `${data.name.replace(/\s+/g, '_')}.jpg`;
        try {
          await downloader.image(url, filename, 'characters/images');
          count++;
        } catch (error) {
          logger.error(`Erreur téléchargement image ${url} : ${error.message}`);
        }
      }

      filesystem.write(`characters/${character}.json`, data);
    }
    logger.log(`Téléchargement de ${count} personnages`);
  },
};
