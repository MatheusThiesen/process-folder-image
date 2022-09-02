import path from "path";
import { ActionImage } from "../repositories/ActionImage";

export class ProcessImage {
  private pathImages;
  private pathDestiny;
  private pathBackup;
  constructor(private actionImage: ActionImage) {
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

    await this.actionImage.compress(readFile, fileDestinyPath, extension);
    await this.actionImage.copy(filepath, fileBackupPath);
    await this.actionImage.delete(filepath);
  }
}
