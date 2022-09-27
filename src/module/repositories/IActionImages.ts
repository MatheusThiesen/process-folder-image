import sharp from "sharp";

export interface IActionImage {
  delete(filepath: string): Promise<void>;
  read(filepath: string): Promise<Buffer>;
  copy(filename: string, destiny: string): Promise<void>;
  compressToFile(
    file: Buffer,
    filepath: string,
    extension: "png" | "jpeg"
  ): Promise<sharp.OutputInfo>;
  compressToBuffer(file: Buffer, extension: "png" | "jpeg"): Promise<Buffer>;
  listAll(path: string): Promise<string[]>;
}
