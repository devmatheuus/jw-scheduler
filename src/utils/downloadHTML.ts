import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { BadRequestError } from '../errors/BadRequestError';

export const downloadHTML = async (url: string, fileName: string) => {
  try {
    const filePath = path.resolve(__dirname, `../temp/html/${fileName}.html`);

    if (fs.existsSync(filePath)) return console.log('HTML já baixado.');

    const response = await axios
      .get(url, { responseType: 'text' })
      .catch((error) => {
        throw new BadRequestError(error.message);
      });

    const html = response.data;

    fs.writeFileSync(filePath, html);

    console.log('HTML baixado com sucesso.');
  } catch (error: any) {
    console.error('Erro ao baixar o HTML:', error.message);
    throw new Error(error.message);
  }
};
