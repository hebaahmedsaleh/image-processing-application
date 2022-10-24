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

    fs.stat(absoluteImagesDir, (error) => {
      if (error) {
        response.status(404).send("The file does not exist.");
      } else {
        resizeImageProcess(absoluteImagesDir, reguest.query, resizedImagesPath)
          .then(async (res) => {
            try {
              const b = await fs.accessSync(resizedImagesPath);
              console.log({ b });

              return b;
            } catch {
              return res;
            }
            // console.log("--+++-----", resizedImagesPath);
            // fs.access(resizedImagesPath, (error) => {
            //   if (!error) {
            //     console.log("-------", resizedImagesPath);
            //     return null;
            //   } else {
            //     console.log("noooo");
            //     fs.writeFile(resizedImagesPath, res, "binary", () => {
            //       return response.sendFile(path.resolve(resizedImagesPath));
            //     });
            //   }
            //   console.log("noooo");
            // });

            //   if (!fs.existsSync(resizedImagesPath)) {
            //     console.log("-------", resizedImagesPath);

            //     fs.writeFile(resizedImagesPath, res, "binary", () => {
            //       return response.sendFile(path.resolve(resizedImagesPath));
            //     });
            //   }
          })
          .then((res) => {
            console.log({ res });
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
