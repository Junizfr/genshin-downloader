import https from 'https';
import path from 'path';
import fs from 'fs';
import * as cheerio from 'cheerio';
import logger from '../utils/logger.js';

export default {
  // Fonction pour télécharger une image avec https.get
  characterImage: async (url, name, dir) => {
    return new Promise((resolve, reject) => {
      const lowerName = name.toLowerCase();
      const filePath = path.join('dist', `${dir}/${lowerName}`);
      const file = fs.createWriteStream(filePath);

      https
        .get(url, (response) => {
          if (response.statusCode !== 200) {
            reject(new Error(`HTTP ${response.statusCode}`));
            return;
          }

          response.pipe(file);
          file.on('finish', () => {
            file.close(resolve);
          });
        })
        .on('error', (err) => {
          fs.unlink(filePath, () => reject(err));
        });
    });
  },

  // Fonction pour télécharger l'image depuis un site en analysant le HTML avec cheerio
  weaponImage: async (name) => {
    try {
      const filename = name
        .replace(/\b(Of|The)\b/g, (match) => match.toLowerCase())
        .replace(/ /g, '_');
      const response = await fetch(`${process.env.GENSHIN_WIKI}/${filename}`);
      const html = await response.text();

      // Analyser le HTML avec cheerio
      const $ = cheerio.load(html);

      // Trouver la balise <figure> avec la classe 'pi-item pi-image'
      const figure = $('figure.pi-item.pi-image');

      // Trouver la balise <img> à l'intérieur de <figure>
      const imgElement = figure.find('img');

      // Extraire la source de l'image
      const imgSrc = imgElement.attr('src');

      if (!imgSrc) {
        await logger.error(`Aucune image trouvée pour ${filename}.`);
        return;
      }

      // Créer un nom de fichier avec l'extension de l'image
      const fileExtension = imgSrc.split('.').pop().split('/')[0];

      const outputLocationPath = path.join(
        'dist',
        'weapons',
        'images',
        `${filename}.${fileExtension}`
      );

      // Résoudre l'URL complète si l'image est en URL relative
      const baseUrl = new URL(process.env.GENSHIN_WIKI + filename);
      const fullImgUrl = new URL(imgSrc, baseUrl).href;

      // Télécharger l'image
      const res = await fetch(fullImgUrl);

      if (!res.ok) {
        logger.error(
          `Erreur HTTP lors du téléchargement de l'image: ${res.statusText}`
        );
        return;
      }

      const buffer = await res.arrayBuffer(); // Utiliser arrayBuffer() pour récupérer l'image
      fs.writeFileSync(outputLocationPath, Buffer.from(buffer)); // Correction ici (Buffer.from)
    } catch (error) {
      logger.error("Erreur lors du téléchargement de l'image :", error);
    }
  },

  elementImage: async (name) => {
    try {
      const response = await fetch(`${process.env.GENSHIN_WIKI}/${name}`);
      const html = await response.text();
      const $ = cheerio.load(html);
      $('img').each(async (index, element) => {
        const imgSrc = $(element).attr('src');
        const imageName = $(element).attr('data-image-name');
        const url = String(imgSrc);
        const title = String(imageName);
        if (
          url.includes('http') &&
          title.includes('Element') &&
          !url.includes('scale-to-width-down')
        ) {
          const outputLocationPath = path.join(
            'dist',
            'elements',
            'images',
            `${title.replace('Element ', '').toLowerCase()}`
          );

          // Résoudre l'URL complète si l'image est en URL relative
          const baseUrl = new URL(process.env.GENSHIN_WIKI + '/' + name);
          const fullImgUrl = new URL(imgSrc, baseUrl).href;

          // Télécharger l'image
          const res = await fetch(fullImgUrl);

          if (!res.ok) {
            logger.error(
              `Erreur HTTP lors du téléchargement de l'image: ${res.statusText}`
            );
            return;
          }

          const buffer = await res.arrayBuffer(); // Utiliser arrayBuffer() pour récupérer l'image
          fs.writeFileSync(outputLocationPath, Buffer.from(buffer)); // Correction ici (Buffer.from)
        }
      });
    } catch (error) {
      logger.error(`Erreur lors du téléchargement de l'image ${error.message}`);
    }
  },
};
