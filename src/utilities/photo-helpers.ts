import { Request, Response } from "express";
import fs, { Stats } from "fs";
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

const test = async (
  imagePath: string,
  query: Record<string, any>,
  resizedImagesPath: string
) => {
  const { filename, width, height } = query;
  const extension = getImageExtension(filename);

  const resizedImage = await sharp(imagePath)
    .resize({
      width: parseInt(width, RADIX),
      height: parseInt(height, RADIX),
    })
    .toFile(resizedImagesPath)
    .then((res) => console.log({ res }));
  return resizedImage;
};

export const resizeImage = async (
  imagePath: string,
  query: Record<string, any>
) => {
  const { filename, width, height } = query;
  const extension = getImageExtension(filename);
  const name = filename.replace(extension, "");
  const resizedImageDir = `${__dirname}/thumb-images`;
  console.log({ __dirname });

  const resizedImagesPath = `${resizedImageDir}${name}-${Number(
    width
  )}-${Number(height)}.${extension}`;

  if (
    !isValidNumbers(parseInt(width, RADIX)) &&
    !isValidNumbers(parseInt(height, RADIX))
  ) {
    return;
  }

  try {
    if (!fs.existsSync(resizedImageDir)) {
      fs.mkdir(resizedImageDir, async (err) => {
        if (err) {
          return console.error({ err });
        } else {
          console.log("Directory created successfully!");

          test(imagePath, query, resizedImagesPath);
        }
      });
    } else {
      test(imagePath, query, resizedImagesPath);
    }
  } catch (error) {
    console.log({ error });
  }
};

const previewPhoto = (reguest: Request, response: Response) => {
  const filename = reguest.query.filename;
  const width = reguest.query.width;
  const height = reguest.query.height;

  const imageDirPath = `./images/${filename}`;
  const absoluteFilePath = getAbsolutePath(`./images/${filename}`);
  const absoluteFileThumbPath = getAbsolutePath(
    "./build/utilities/thumb-images/"
  );

  if (!isValidImage(filename as string) || !filename) {
    response.status(400).send("This file not image.");
  }

  fs.stat(imageDirPath, (error) => {
    if (error) {
      response.status(404).send("The file does not exist.");
    } else {
      if (width && height) {
        resizeImage(absoluteFilePath, reguest.query).then((res) => {
          response.sendFile(absoluteFileThumbPath);
          return;
        });
        console.log({ absoluteFilePath });
        response.sendFile(absoluteFilePath);
      }
    }
  });
};

export default previewPhoto;
