import fs from 'fs';
import path from 'path';

/**
 * @NOTE: can only be used in nodejs environment
 * ensure that the fs fix is applied to next.config

{
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.path = false;
    }
    return config;
  },
}

 * */

export const ROUTES = {
  POLICIES: 'legal',
  DATA: 'content',
  META: 'seo',
};

export function getMarkdownFiles(
  dir = `${ROUTES.DATA}/${ROUTES.POLICIES}`
): Promise<{ files: string[]; error: boolean }> {
  const ext = '.md';

  return new Promise((resolve, reject) => {
    fs.readdir(path.join(process.cwd(), dir), (error, files) => {
      if (error) {
        reject({ error, files: [] });
        return;
      }

      const markdownFiles = files
        .filter((file) => path.extname(file).toLowerCase() === ext)
        .map((file) => (typeof file === 'string' ? file.replace(ext, '') : ''));

      resolve({ files: markdownFiles, error: false });
    });
  });
}

export function getMarkdownFileContent(
  file: string,
  dir = ROUTES.DATA
): Promise<{ content: string; error: boolean }> {
  const ext = '.md';

  const markdownFilePath = path.join(process.cwd(), dir, file + ext);

  return new Promise((resolve, reject) => {
    fs.access(markdownFilePath, fs.constants.F_OK, (error) => {
      if (error) {
        resolve({ content: '', error: false });
        return;
      }

      fs.readFile(markdownFilePath, 'utf8', (error, data) => {
        if (error) {
          reject({ error });
          return;
        }

        console.log('data server', data);

        resolve({ content: data.trim(), error: false });
      });
    });
  });
}
