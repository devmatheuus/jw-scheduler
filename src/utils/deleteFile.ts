import path from 'path';
import fs from 'fs';

export const deleteFile = async (filename: string): Promise<boolean> => {
  const filePath = path.resolve(__dirname, `../temp/html/${filename}.html`);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return true;
  }

  return false;
};
