import filesystem from './functions/filesystem.js';
import tasks from './tasks.js';
import dotenv from 'dotenv';

import characters from './items/characters.js';
import weapons from './items/weapons.js';

dotenv.config();

filesystem.setup();
await tasks.setupCharacters();
await tasks.setupWeapons();

await characters.downloads();
await weapons.downloads();
