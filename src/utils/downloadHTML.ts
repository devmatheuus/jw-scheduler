import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { BadRequestError } from '../errors/BadRequestError';

export const downloadHTML = async (url: string, fileName: string) => {
  const filePath = path.resolve(__dirname, `../temp/html/${fileName}.html`);
  if (fs.existsSync(filePath)) return;

  try {
    const response = await axios
      .get(url, { responseType: 'text' })
      .catch((error) => {
        throw new BadRequestError(error.message);
      });

    const html = response.data;

    fs.writeFileSync(filePath, html);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
