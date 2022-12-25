import express, { Request, Response } from 'express';
import { validName } from '../middlewares/middlewares';
import { validDimension } from '../middlewares/middlewares';
import { dirPath } from '../utiles/path';
import path from 'path';
import { existsSync } from 'fs';
import { resizing } from '../utiles/resize';

const router = express.Router();

router.use([validName, validDimension]);

router.get('/', async (req, res) => {
  const name = req.query.name as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);
  const hasDimensions: boolean = req.query.hasDimensions == 'true';

  // If no dimentions added import the image frome image folder
  if (!hasDimensions) {
    res.status(200).sendFile(path.join(dirPath, name + '.jpg'));
    return;
  }

  let outputFilePath = path.join(dirPath, `../resized/${name} ${width} ${height}.jpg`);

  // If the requested image with dimentions is already included in resized folder import it from resized folder (cashing)
  if (existsSync(outputFilePath)) {
    res.status(200).sendFile(outputFilePath);
  } 
  
  // If the requested image with dimentions is not already included in resized folder resize it and push it into resized folder
  else {
    const resizedSuccessfully = await resizing({
      input: path.join(dirPath, name + '.jpg'),
      output: outputFilePath,
      width: width,
      height: height,
    });

    if (resizedSuccessfully) {
      res.status(200).sendFile(path.join(dirPath, `../resized/${name} ${width} ${height}.jpg`));
    } else {
      res.status(500).send('502 Server error: Failed to resize image');
    }
  }

  return;
});

export default router;
