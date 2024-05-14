import { queueAsPromised } from "fastq";
import path from "path";
import { QueueTask } from "../../lib/queue";
import { ActionImage } from "../repositories/ActionImage";

export class PopulateQueueTasks {
  private pathImages;

  constructor(
    private actionImage: ActionImage,
    private queue: queueAsPromised<QueueTask>
  ) {
    this.pathImages = process.env.PATH_IMAGES || "";
  }
  async execute() {
    const files = await this.actionImage.listAll(this.pathImages);

    for (const filename of files.filter(f=> !['desktop.ini' , 'Thumbs.db'].includes(f))) {
      try {
        await this.actionImage.read(path.resolve(this.pathImages, filename));

        await this.queue.push({
          filename,
        });
        console.log(`[PROCESSADO] ${filename}`);
      } catch (error) {
        console.log(filename);
        
        console.log(error);
        
      }
    }
  }
}
