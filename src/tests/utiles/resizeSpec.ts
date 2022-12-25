import path from 'path';
import sharp from 'sharp';
import { dirPath } from '../../utiles/path';

it('Resize function testing', async () => {
  const input = path.join(dirPath, 'fjord.jpg');
  const output = path.join(dirPath, '../resized/fjord 2358 4896.jpg');
  const width = 2358;
  const height = 4896;

  try {
    await sharp(input).resize({ width, height }).toFile(output);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
});
