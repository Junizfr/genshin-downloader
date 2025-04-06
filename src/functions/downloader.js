import https from 'https';
import path from 'path';
import fs from 'fs';

export default {
  image: async (url, name, dir) => {
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
};
