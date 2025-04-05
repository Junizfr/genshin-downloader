import characters from './characters.js';
import filesystem from './functions/filesystem.js';
import tasks from './tasks.js';

export default {
  charactersURL: 'https://genshin.jmp.blue/characters',
  queryURL: 'https://genshin-db-api.vercel.app/api/v5/characters?query=',
};

filesystem.setup();
await tasks.setupCharacters();
await characters.downloads();
