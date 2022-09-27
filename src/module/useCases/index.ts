import { ActionImage } from "../repositories/ActionImage";
import { queue } from "./../../lib/queue";
import { UploadImage } from "./../repositories/UploadImage";
import { PopulateQueueTasks } from "./PopulateQueueTasks";
import { ProcessImage } from "./ProcessImage";

const actionImage = new ActionImage();
const uploadImage = new UploadImage();
export const processeImage = new ProcessImage(actionImage, uploadImage);
export const populateQueueTasks = new PopulateQueueTasks(actionImage, queue);
