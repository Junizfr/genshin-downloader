import api from './functions/api.js';
import app from './app.js';
import filesystem from './functions/filesystem.js';

export default {
  setupCharacters: async () => {
    const data = await api.get(app.charactersURL);
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
