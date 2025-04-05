import filesystem from './functions/filesystem.js'
import tasks from './tasks.js'

export default {
  charactersURL: 'https://genshin.jmp.blue/characters',
}

filesystem.setup()
tasks.setupCharacters()
