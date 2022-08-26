import sharp from "sharp";

export interface IActionImage {
  delete(filepath: string): Promise<void>;
  read(filepath: string): Promise<Buffer>;
  copy(filename: string, destiny: string): Promise<void>;
  compress(file: Buffer, filepath: string): Promise<sharp.OutputInfo>;
  listAll(path: string): Promise<string[]>;
}
