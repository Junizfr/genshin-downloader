import app from './app.js';
import api from './functions/api.js';
import downloader from './functions/downloader.js';
import filesystem from './functions/filesystem.js';

export default {
  downloads: async () => {
    const characters = JSON.parse(filesystem.read('characters.json'));

    let imagesCount = 0;

    for (const character of characters) {
      const data = await api.get(`${app.queryURL}${character}`);

      if (data.images && data.images.cover1) {
        const url = data.images.cover1;
        const filename = `${data.name.replace(/\s+/g, '_')}.jpg`;
        try {
          await downloader.image(url, filename, 'characters/images');
          imagesCount++;
        } catch (error) {
          console.error(
            `Erreur téléchargement image ${url} : ${error.message}`
          );
        }
      }

      filesystem.write(`characters/${character}.json`, data);
    }
    console.log(`✅ Téléchargement de ${imagesCount} images de personnages`);
  },
};
