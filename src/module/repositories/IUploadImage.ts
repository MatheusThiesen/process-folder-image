export interface IUploadImage {
  upload(filename: string, file: Buffer,fileSmall: Buffer): Promise<string>;
}
