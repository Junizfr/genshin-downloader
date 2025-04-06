import { describe, it, expect } from 'vitest';
import filesystem from '../../src/functions/filesystem.js';
import fs from 'fs';
import path from 'path';

describe('Filesystem setup', () => {
  it('should logs exist', async () => {
    if (fs.existsSync('dist')) {
      const files = fs.readdirSync('dist');
      files.forEach((file) => {
        const filePath = path.join('dist', file);
        if (fs.lstatSync(filePath).isDirectory()) {
          fs.rmdirSync(filePath, { recursive: true });
        } else {
          fs.unlinkSync(filePath);
        }
      });
    }

    const directories = filesystem.setup();

    expect(fs.existsSync('dist/access.log')).toBe(true);
  });
});
