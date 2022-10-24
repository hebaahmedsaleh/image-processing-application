import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const RADIX = 10;
const validImageExtensions = ["jpg", "jpeg", "png", "bmp", "gif"];

const isValidNumbers: (value: number) => boolean = (value) => !isNaN(value);
const getAbsolutePath: (filePath: string) => string = (filePath) =>
  path.resolve(filePath);

const getImageExtension: (name: string) => string = (name) => {
  const extension = name.substring(name.lastIndexOf(".") + 1).toLowerCase();
  return extension;
};

const isValidImage: (name: string) => boolean = (name) => {
  const extension = getImageExtension(name);
  return validImageExtensions.includes(extension);
};

const resizeImage = async (imagePath: string, query: Record<string, any>) => {
  const { filename, width, height } = query;

  const resizedImage = await sharp(`${imagePath}/${filename}`)
    .resize({
      width: parseInt(width, RADIX),
      height: parseInt(height, RADIX),
    })
    .toBuffer()
    .then((res) => {
      return res;
    })
    .catch((error) => error);
  return resizedImage;
};

export const resizeImageProcess = async (
  imagePath: string,
  query: Record<string, any>,
  resizedPhotoAbsolutePath: string
) => {
  try {
    return resizeImage(imagePath, query);
  } catch (error) {
    console.log({ error });
  }
};

const processPhoto = (reguest: Request, response: Response) => {
  const filename = reguest.query.filename;
  const width = reguest.query.width;
  const height = reguest.query.height;

  if (!filename) {
    response.end("No file name in route");
  }

  const absoluteImagesDir = getAbsolutePath(`./images/`);
  const absoluteThumbDir = getAbsolutePath("./build/utilities/");
  const extension = getImageExtension(filename as string);

  const name = filename?.replace(`.${extension}`, "");
  let resizedImagesPath = "";

  if (!height && !width) {
    fs.stat(absoluteImagesDir, () => {
      return response.sendFile(`${absoluteImagesDir}/${filename}`);
    });
  }

  if (isValidNumbers(Number(width)) && isValidNumbers(Number(height))) {
    resizedImagesPath = `${absoluteThumbDir}/${name}_${Number(width)}_${Number(
      height
    )}.${extension}`;

    fs.stat(absoluteImagesDir, async (error) => {
      if (error) {
        response.status(404).send("The file does not exist.");
      } else {
        try {
          console.log({ resizedImagesPath });
          await fs.accessSync(resizedImagesPath);
          console.log("Image already exists");
          return response.sendFile(path.resolve(resizedImagesPath));
        } catch (ex) {
          console.log("Image does not exist. Next Step: Resizing");
        }
        resizeImageProcess(
          absoluteImagesDir,
          reguest.query,
          resizedImagesPath
        ).then((res) => {
          if (res) {
            fs.writeFile(resizedImagesPath, res, "binary", () => {
              return response.sendFile(path.resolve(resizedImagesPath));
            });
          }
        });
      }
    });
  }

  if (!isValidImage(filename as string) || !filename) {
    return response.status(400).send("This file not image.");
  }
};

export default processPhoto;
