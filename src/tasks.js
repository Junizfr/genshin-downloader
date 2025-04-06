import api from './functions/api.js';
import filesystem from './functions/filesystem.js';
import logger from './utils/logger.js';

export default {
  setupCharacters: async () => {
    const data = await api.get(process.env.GENSHIN_CHARACTERS);
    const characters = [];
    for (const character of data) {
      if (character.startsWith('traveler-')) continue;
      characters.push(character.replace('-', ''));
    }
    filesystem.write('characters.json', characters);
    logger.log(`Importation de ${characters.length} personnages`);
    return characters;
  },

  setupWeapons: async () => {
    const data = await api.get(process.env.GENSHIN_WEAPONS);
    const weapons = [];
    for (const weapon of data) {
      weapons.push(weapon);
    }
    filesystem.write('weapons.json', weapons);
    logger.log(`Importation de ${weapons.length} armes`);
    return weapons;
  },
};
