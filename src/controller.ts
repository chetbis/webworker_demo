import type {View} from "./view.ts";
import type {Model} from "./model.ts";

export class Controller {
  constructor(private readonly view: View, private readonly model: Model) {
    this.view.bindUploadChange(this.onFileInputValueChange.bind(this));
  }

  onFileInputValueChange(file: File) {
    this.view.readFile(file, this.onFileRead.bind(this));
  }

  onFileRead(dataUri: string) {
    this.view.drawOnCanvas(dataUri, this.processImageData.bind(this));
  }

  async processImageData(imageData: ImageData) {
    await this.model.processImage(imageData, this.onImageProcessed.bind(this));
  }

  onImageProcessed(imageData: ImageData) {
    this.view.putImageData(imageData);
  }
}
