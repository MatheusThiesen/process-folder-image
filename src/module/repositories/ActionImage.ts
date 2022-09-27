import fs from "fs";
import sharp from "sharp";
import { IActionImage } from "./IActionImages";

export class ActionImage implements IActionImage {
  readonly quality = (value: number) =>
    Number(value / 1024) > 9000
      ? 25
      : Number(value / 1024) > 8000
      ? 30
      : Number(value / 1024) > 500
      ? 50
      : 80;

  async delete(filepath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.unlink(filepath, (err) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  }

  async read(filepath: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.readFile(filepath, (err, date) => {
        if (err) {
          reject(err);
        }

        resolve(date);
      });
    });
  }

  async copy(filepath: string, destiny: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.copyFile(filepath, destiny, (err) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  }

  async compressToFile(
    file: Buffer,
    filepath: string,
    extension: "png" | "jpeg"
  ): Promise<sharp.OutputInfo> {
    const quality = this.quality(file.byteLength);

    if (extension === "png") {
      return await new Promise((resolve, reject) => {
        sharp(file)
          .png({ quality: quality, progressive: true })
          .toFile(filepath, (err, info) => {
            if (err) {
              reject(err);
            }

            resolve(info);
          });
      });
    } else {
      return await new Promise((resolve, reject) => {
        sharp(file)
          .jpeg({ quality: quality, progressive: true })
          .toFile(filepath, (err, info) => {
            if (err) {
              reject(err);
            }

            resolve(info);
          });
      });
    }
  }

  async compressToBuffer(
    file: Buffer,
    extension: "png" | "jpeg"
  ): Promise<Buffer> {
    const quality = this.quality(file.byteLength);

    if (extension === "png") {
      return sharp(file)
        .png({ quality: quality, progressive: true })
        .toBuffer();
    } else {
      return sharp(file)
        .jpeg({ quality: quality, progressive: true })
        .toBuffer();
    }
  }

  async listAll(pathfiles: string): Promise<string[]> {
    return await new Promise((resolve, reject) => {
      fs.readdir(pathfiles, (err, files) => {
        if (err) {
          reject(err);
        }

        resolve(files);
      });
    });
  }
}
