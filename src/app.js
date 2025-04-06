import characters from './characters.js';
import filesystem from './functions/filesystem.js';
import tasks from './tasks.js';
import dotenv from 'dotenv';

dotenv.config();

filesystem.setup();
await tasks.setupCharacters();
await characters.downloads();
