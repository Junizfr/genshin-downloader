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

  setupElements: async () => {
    const data = {
      anemo: {
        name: 'Anemo',
        icon: 'anemo.png',
      },
      cryo: {
        name: 'Cryo',
        icon: 'cryo.png',
      },
      dendro: {
        name: 'Dendro',
        icon: 'dendro.png',
      },
      electro: {
        name: 'Electro',
        icon: 'electro.png',
      },
      geo: {
        name: 'Geo',
        icon: 'geo.png',
      },
      hydro: {
        name: 'Hydro',
        icon: 'hydro.png',
      },
      pyro: {
        name: 'Pyro',
        icon: 'pyro.png',
      },
    };
    filesystem.write('elements.json', data);
    logger.log(`Importation de ${data.length} éléments`);
    return data;
  },
};
