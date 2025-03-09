export class View {
  upload = document.querySelector<HTMLInputElement>('#upload');
  canvas = document.querySelector<HTMLCanvasElement>('#canvas');

  bindUploadChange(handler: (v: File) => void) {
    this.upload?.addEventListener('change', (event) => {
      const input = event.target as (HTMLInputElement | null);
      if (!input) return;
      const file = input.files?.[0];
      if (!file) return;
      handler(file);
    });
  }

  readFile(file: File, handler: (data: string) => void) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (!result) return;
      handler(result as string);
    };
    reader.readAsDataURL(file);
  }

  drawOnCanvas(dataURL: string, handler: (data: ImageData) => void) {
    const img = new Image();
    img.onload = () => {
      if (!this.canvas) return;
      this.canvas.width = img.width;
      this.canvas.height = img.height;

      const context = this.canvas.getContext('2d', {willReadFrequently: true});
      if (!context) return;
      context.drawImage(img, 0, 0);

      handler(context.getImageData(0, 0, img.width, img.height));
    };
    img.src = dataURL;
  }

  putImageData(imageData: ImageData) {
    if (!this.canvas) return;
    const context = this.canvas.getContext('2d', {willReadFrequently: true});
    if (!context) return;
    context.putImageData(imageData, 0, 0);
  }
}
