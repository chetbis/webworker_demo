import {wrap} from "comlink";

interface WorkerClassApi {
  greyScale: (v: ImageData) => Promise<ImageData>;
}

interface WorkerClassApiConstructor {
  new(): WorkerClassApi;
}


export class Model {
  workerClassInstance: WorkerClassApi | null = null;
  workerClass = wrap<WorkerClassApiConstructor>(new Worker(new URL('./worker.ts', import.meta.url), {type: 'module'}))

  async getInstance() {
    if (!this.workerClassInstance) {
      this.workerClassInstance = await new this.workerClass();
    }
    return this.workerClassInstance;
  }

  async processImage(imageData: ImageData, handler: (v: ImageData) => void) {
    const workerInst = await this.getInstance();
    if (!workerInst) return;
    handler(await workerInst.greyScale(imageData));
  }
}
