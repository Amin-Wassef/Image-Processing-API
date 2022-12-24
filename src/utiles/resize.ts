import sharp from "sharp";

type resize = {
  input: string;
  output: string;
  width: number;
  height: number;
}

export const resizing = async ({ input, output, width, height }: resize): Promise<boolean> => {
  
  try {
    await sharp(input)
    .resize({ width, height })
    .toFile(output);
    return true;
  } 
  
  catch (error) {
    console.log(error);
    return false;
  }
};
