"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const RADIX = 10;
const validImageExtensions = ["jpg", "jpeg", "png", "bmp", "gif"];
const isValidNumbers = (value) => !isNaN(value);
const getAbsolutePath = (filePath) => path_1.default.resolve(filePath);
const getImageExtension = (name) => {
    const extension = name.substring(name.lastIndexOf(".") + 1).toLowerCase();
    return extension;
};
const isValidImage = (name) => {
    const extension = getImageExtension(name);
    return validImageExtensions.includes(extension);
};
const test = (imagePath, query, resizedImagesPath) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, width, height } = query;
    const extension = getImageExtension(filename);
    const resizedImage = yield (0, sharp_1.default)(imagePath)
        .resize({
        width: parseInt(width, RADIX),
        height: parseInt(height, RADIX),
    })
        .toFile(resizedImagesPath)
        .then((res) => console.log({ res }));
    return resizedImage;
});
const resizeImage = (imagePath, query) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, width, height } = query;
    const extension = getImageExtension(filename);
    const name = filename.replace(extension, "");
    const resizedImageDir = `${__dirname}/thumb-images`;
    console.log({ __dirname });
    const resizedImagesPath = `${resizedImageDir}${name}-${Number(width)}-${Number(height)}.${extension}`;
    if (!isValidNumbers(parseInt(width, RADIX)) &&
        !isValidNumbers(parseInt(height, RADIX))) {
        return;
    }
    try {
        if (!fs_1.default.existsSync(resizedImageDir)) {
            fs_1.default.mkdir(resizedImageDir, (err) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    return console.error({ err });
                }
                else {
                    console.log("Directory created successfully!");
                    test(imagePath, query, resizedImagesPath);
                }
            }));
        }
        else {
            test(imagePath, query, resizedImagesPath);
        }
    }
    catch (error) {
        console.log({ error });
    }
});
exports.resizeImage = resizeImage;
const previewPhoto = (reguest, response) => {
    const filename = reguest.query.filename;
    const width = reguest.query.width;
    const height = reguest.query.height;
    const imageDirPath = `./images/${filename}`;
    const absoluteFilePath = getAbsolutePath(`./images/${filename}`);
    const absoluteFileThumbPath = getAbsolutePath("./build/utilities/thumb-images/");
    if (!isValidImage(filename) || !filename) {
        response.status(400).send("This file not image.");
    }
    fs_1.default.stat(imageDirPath, (error) => {
        if (error) {
            response.status(404).send("The file does not exist.");
        }
        else {
            if (width && height) {
                (0, exports.resizeImage)(absoluteFilePath, reguest.query).then((res) => {
                    response.sendFile(absoluteFileThumbPath);
                    return;
                });
                console.log({ absoluteFilePath });
                response.sendFile(absoluteFilePath);
            }
        }
    });
};
exports.default = previewPhoto;
