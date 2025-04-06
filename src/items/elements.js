import downloader from '../functions/downloader.js';
import filesystem from '../functions/filesystem.js';
import logger from '../utils/logger.js';

export default {
  downloads: async () => {
    const elements = JSON.parse(filesystem.read('elements.json'));

    let count = 0;

    Object.entries(elements).forEach(async ([key]) => {
      downloader.elementImage(key);
      count++;
    });

    logger.log(`Téléchargement de ${count} images d'elements`);
  },
};
