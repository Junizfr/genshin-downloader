import api from './functions/api.js';
import filesystem from './functions/filesystem.js';

export default {
  setupCharacters: async () => {
    const data = await api.get(process.env.GENSHIN_CHARACTERS);
    const characters = [];
    for (const character of data) {
      if (character.startsWith('traveler-')) continue;
      characters.push(character.replace('-', ''));
    }
    filesystem.write('characters.json', characters);
    console.log(`✅ Importation de ${characters.length} personnages`);
    return characters;
  },
};
