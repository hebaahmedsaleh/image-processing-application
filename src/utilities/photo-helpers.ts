import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";

interface QueryTypes {
  filename?: string;
  width?: string;
  height?: string;
}

const RADIX = 10;
const validImageExtensions = ["jpg", "jpeg", "png", "bmp", "gif"];

const isValidNumbers: (value: number) => boolean = (value) =>
  !isNaN(value) && value > 0;
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
  query: Record<string, any>
) => {
  try {
    return resizeImage(imagePath, query);
  } catch (error) {
    return error;
  }
};

const processPhoto = (reguest: Request, response: Response) => {
  const filename = reguest.query.filename;
  const width = reguest.query.width;
  const height = reguest.query.height;

  const isValidWidth = isValidNumbers(Number(width)) && Number(width) > 0;
  const isValidHeight = isValidNumbers(Number(height)) && Number(height) > 0;

  if (!isValidImage(filename as string) || !filename) {
    return response.status(400).send("This file not image.");
  }

  if (!filename) {
    response.end("No file name in route");
  } else {
    const absoluteImagesDir = getAbsolutePath(`./images/`);
    const absoluteThumbDir = getAbsolutePath("./build/utilities/");
    const extension = getImageExtension(filename as string);

    let resizedImagesPath = "";

    if (isValidWidth && isValidHeight && typeof filename === "string") {
      const name = filename?.replace(`.${extension}`, "");
      resizedImagesPath = `${absoluteThumbDir}/${name}_${Number(
        width
      )}_${Number(height)}.${extension}`;

      fs.stat(absoluteImagesDir, async (error) => {
        if (error) {
          response.status(404).send("The file does not exist.");
        } else {
          try {
            await fs.accessSync(resizedImagesPath);

            return response.sendFile(path.resolve(resizedImagesPath));
          } catch (exception) {
            resizeImageProcess(absoluteImagesDir, reguest.query).then((res) => {
              if (res) {
                fs.writeFile(resizedImagesPath, res, "binary", () => {
                  return response.sendFile(path.resolve(resizedImagesPath));
                });
              }
            });
          }
        }
      });
    } else if (!isValidWidth) {
      return response.status(404).send("Invalid width");
    } else if (!isValidHeight) {
      return response.status(404).send("Invalid height");
    } else {
      fs.stat(absoluteImagesDir, () => {
        return response.sendFile(`${absoluteImagesDir}/${filename}`);
      });
    }
  }
};

export default processPhoto;
