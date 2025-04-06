import filesystem from './functions/filesystem.js';
import tasks from './tasks.js';
import dotenv from 'dotenv';

import characters from './items/characters.js';
import weapons from './items/weapons.js';
import elements from './items/elements.js';

dotenv.config();

filesystem.setup();
await tasks.setupCharacters();
await tasks.setupWeapons();
await tasks.setupElements();

await elements.downloads();
await characters.downloads();
await weapons.downloads();
