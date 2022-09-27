export interface IUploadImage {
  upload(filename: string, file: Buffer): Promise<string>;
}
