import "dotenv/config";

import { processeImage } from "../module/useCases";

import { QueueTask } from "./queue";

export async function worker({ filename }: QueueTask) {
  return await processeImage.execute(filename);
}
