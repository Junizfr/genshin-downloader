import api from '../functions/api.js';
import filesystem from '../functions/filesystem.js';
import downloader from '../functions/downloader.js';

export default {
  downloads: async () => {
    const weapons = JSON.parse(filesystem.read('weapons.json'));
    let count = 0;

    for (const weapon of weapons) {
      const data = await api.get(`${process.env.GENSHIN_WEAPONS}/${weapon}`);
      filesystem.write(`weapons/${weapon.replace('-', '_')}.json`, data);
      await downloader.weaponsImages(data.name);
      count++;
    }
    console.log(`✅ Téléchargement de ${count} armes`);
  },
};
