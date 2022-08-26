import "dotenv/config";
import cron from "node-cron";
import { populateQueueTasks } from "./module/useCases";

class TaskScheduler {
  private cronJob: string;

  constructor() {
    this.cronJob = process.env.TEMPORIZADOR_ROTINA ?? "* * * * *";
  }

  getNowFormatDate() {
    return new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  execute() {
    cron.schedule(this.cronJob, async () => {
      try {
        console.log(`[SINC] Data ${this.getNowFormatDate()}`);
        populateQueueTasks.execute();
        // console.log(`[INICIO][SINCRONIZACAO] Data ${this.getNowFormatDate()}`);
        // console.log(`[FIM][SINCRONIZACAO] Data ${this.getNowFormatDate()}`);
      } catch (error) {
        console.log(`[ERRO][SINCRONIZACAO] Data ${this.getNowFormatDate()}`);
      }
    });
  }
  async generateFile() {
    populateQueueTasks.execute();
  }
}

const taskScheduler = new TaskScheduler();
taskScheduler.execute();
taskScheduler.generateFile();
