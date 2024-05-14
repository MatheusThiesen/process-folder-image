import AWS from "aws-sdk";
import { IUploadImage } from "./IUploadImage";

export class UploadImage implements IUploadImage {
  private importPath: string;
  private bucketName: string;
  private accessKeyId: string;
  private secretAccessKey: string;
  private endPoint: string;
  private s3: AWS.S3;

  constructor() {
    this.importPath = process.env.PATH_IMAGES || "C:";
    this.bucketName = process.env.BUCKET_NAME || "";
    this.accessKeyId = process.env.AWS_ACCESS_KEY || "";
    this.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || "";
    this.endPoint = process.env.S3_ENDPOINT || "";

    AWS.config.update({
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
      region: "sfo3",
    });
    this.s3 = new AWS.S3({
      endpoint: this.endPoint,
      params: { Bucket: this.bucketName },
    });
  }
  upload(filename: string, file: Buffer, fileSmall: Buffer): Promise<string> {
    var namefile = "";
    const nameSplit = filename.split(".");

    for (let index = 0; index < nameSplit.length; index++) {
      const element = nameSplit[index];
  
      if (index !== nameSplit.length - 1) {
        if(index === 0 ){
          namefile += element;
        }else {
  
          namefile += '.'+element;
        }
      }
    }


    const putObjectPromise = this.s3
      .putObject({
        Bucket: this.bucketName,
        Key: `Produtos/${namefile}`,
        Body: file,
        ContentType: "image",
        ACL: "public-read",
      })
      .promise();

      const promise = Promise.all([
        this.s3
          .putObject({
            Bucket: this.bucketName,
            Key: `Produtos/${namefile}`,
            Body: file,
            ContentType: "image",
            ACL: "public-read",
          })
          .promise(),
        this.s3
          .putObject({
            Bucket: this.bucketName,
            Key: `Produtos/${namefile}_smaller`,
            Body: fileSmall,
            ContentType: "image",
            ACL: "public-read",
          })
          .promise(),
      ]);

    return new Promise<string>((resolve, reject) => {
      putObjectPromise
        .then(() => {
          resolve(filename);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
