import { ActionImage } from "../repositories/ActionImage";
import { queue } from "./../../lib/queue";
import { PopulateQueueTasks } from "./PopulateQueueTasks";
import { ProcessImage } from "./ProcessImage";

const actionImage = new ActionImage();
export const processeImage = new ProcessImage(actionImage);
export const populateQueueTasks = new PopulateQueueTasks(actionImage, queue);
