import express, { Request, Response, NextFunction } from 'express';
import fs, { existsSync } from 'fs';
import path from 'path';
import { dirPath } from '../utiles/path';

// To check if name is included in the image folder
export const validName = (req: Request, res: Response, next: NextFunction): void => {
    const name = req.query.name as string;
    const imgPath = path.join(dirPath,name+'.jpg');

    if (name == undefined) {
        res.status(400).send('400 Bad Request: ?name="file name" is required');
    
    }else if (!existsSync(imgPath)) {
        res.status(404).send('404 Not Found: No image with this name');
    
    }else{
        next();
    }
}


// To check and validate width and hight values
export const validDimension = ((req: Request, res: Response, next: NextFunction): void => {
    // const width = parseInt(req.query.width as string);
    // const height = parseInt(req.query.height as string);

    const width = req.query.width as unknown as number;
    const height = req.query.height as unknown as number;

    if (width == undefined && height == undefined) {
        req.query.hasDimensions = "false";
        next();
    
    } else if (width == undefined || height == undefined) {
        res.status(400).send('400 Bad Request: Please assign both width and height');
    
    } else if (width <= 0 || height <= 0) {
        res.status(400).send('400 Bad Request: width and hight should be a number greater than 0');
    
    } else if (width > 0 && height > 0) {
        req.query.hasDimensions = "true";
        next();
    
    } else {
        res.status(400).send('400 Bad Request: Unknown error occurred with dimensions');
    }
})