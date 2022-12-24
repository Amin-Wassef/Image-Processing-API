import express, { Request, Response } from "express";
import { validName } from "../middlewares/middlewares";
import { validDimension } from "../middlewares/middlewares";
import { dirPath } from "../utiles/path";
import path from "path";
import { existsSync } from "fs";
import { resizing } from "../utiles/resize";


const router = express.Router();

router.use([validName, validDimension]);

router.get("/", async (req, res) => {
  const name = req.query.name as string;
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);
  const hasDimensions: boolean = req.query.hasDimensions == "true";

  if (!hasDimensions) {
    res.sendFile(path.join(dirPath, name + ".jpg"));
    return;
  }


  let outputFilePath = path.join(dirPath, `../resized/${name} ${width} ${height}.jpg`);

  if (existsSync(outputFilePath)) {
    res.sendFile(outputFilePath);
  
  } else {
    const resizedSuccessfully = await resizing({
      input: path.join(dirPath, name + ".jpg"),
      output: outputFilePath,
      width: width,
      height: height
    });

    if (resizedSuccessfully) {
      res.sendFile(path.join(dirPath, `../resized/${name} ${width} ${height}.jpg`));
    
    } else {
      res.status(500).send("502 Server error: Failed to resize image");
    }
  }

  return;
});

export default router;