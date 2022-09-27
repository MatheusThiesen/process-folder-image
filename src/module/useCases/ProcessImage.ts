import path from "path";
import { ActionImage } from "../repositories/ActionImage";
import { IUploadImage } from "../repositories/IUploadImage";

export class ProcessImage {
  private pathImages;
  private pathDestiny;
  private pathBackup;
  constructor(
    private actionImage: ActionImage,
    private uploadImage: IUploadImage
  ) {
    this.pathImages = process.env.PATH_IMAGES || "";
    this.pathDestiny = process.env.PATH_DESTINY || "";
    this.pathBackup = process.env.PATH_BACKUP || "";
  }

  async execute(filename: string) {
    const filepath = path.resolve(this.pathImages, filename);
    const fileDestinyPath = path.resolve(this.pathDestiny, filename);
    const fileBackupPath = path.resolve(this.pathBackup, filename);

    const readFile = await this.actionImage.read(filepath);

    const extensionSlit = filename.split(".");

    const extension =
      extensionSlit[extensionSlit.length - 1].toLocaleUpperCase() === "PNG"
        ? "png"
        : "jpeg";

    await this.actionImage.compressToFile(readFile, fileDestinyPath, extension);

    const fileCompress = await this.actionImage.compressToBuffer(
      readFile,
      extension
    );
    await this.uploadImage.upload(filename, fileCompress);
    await this.actionImage.copy(filepath, fileBackupPath);
    await this.actionImage.delete(filepath);
  }
}
