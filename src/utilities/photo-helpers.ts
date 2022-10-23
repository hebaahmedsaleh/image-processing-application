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

const resizeImage = async (
  imagePath: string,
  query: Record<string, any>,
  resizedImagesPath: string
) => {
  const { filename, width, height } = query;
  console.log({ resizeImage: imagePath });

  const resizedImage = await sharp(`${imagePath}/${filename}`)
    .resize({
      width: parseInt(width, RADIX),
      height: parseInt(height, RADIX),
    })
    .toFile(resizedImagesPath)
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
  const resizedImageDir = `${__dirname}/thumb-images`;
  try {
    if (!fs.existsSync(resizedImageDir)) {
      fs.mkdir(resizedImageDir, async (err) => {
        if (err) {
          return err;
        }
        return resizeImage(imagePath, query, resizedPhotoAbsolutePath);
      });
    } else {
      return resizeImage(imagePath, query, resizedPhotoAbsolutePath);
    }
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
  const absoluteThumbDir = getAbsolutePath("./build/utilities/thumb-images/");
  const extension = getImageExtension(filename as string);

  const name = filename?.replace(`.${extension}`, "");
  let resizedImagesPath = "";

  if (!height && !width) {
    fs.stat(absoluteImagesDir, () => {
      return response.sendFile(`${absoluteImagesDir}/${filename}`);
    });
  }

  if (isValidNumbers(Number(width)) && isValidNumbers(Number(height))) {
    resizedImagesPath = `${absoluteThumbDir}/${name}-${Number(width)}-${Number(
      height
    )}.${extension}`;

    fs.stat(absoluteImagesDir, (error) => {
      if (error) {
        response.status(404).send("The file does not exist.");
      } else {
        const resizedPhotoAbsolutePath = absoluteThumbDir
          .replace(filename as string, resizedImagesPath)
          .concat(`/${name}-${width}-${height}.${extension}`);

        resizeImageProcess(
          absoluteImagesDir,
          reguest.query,
          resizedPhotoAbsolutePath
        ).then(() => response.sendFile(resizedPhotoAbsolutePath));
      }
    });
  }

  if (!isValidImage(filename as string) || !filename) {
    return response.status(400).send("This file not image.");
  }
};

export default processPhoto;
