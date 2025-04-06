import { describe, it, expect } from 'vitest';
import dotenv from 'dotenv';

dotenv.config();

describe('API Endpoints', () => {
  it('should return a list of characters', async () => {
    const response = await fetch(process.env.GENSHIN_CHARACTERS);
    expect(response.status).toBe(200);
  });

  it('should return a character by name', async () => {
    const response = await fetch(`${process.env.GENSHIN_QUERY}albedo`);
    expect(response.status).toBe(200);
  });
});
