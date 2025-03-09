import { expose } from 'comlink';

class ImageProcessor {
  greyScale(imageData: ImageData) {
    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i+=4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const gray = 0.3 * r + 0.59 * g + 0.11 * b;
      pixels[i] = pixels[i + 1] = pixels[i + 2] = gray;
    }

    return imageData;
  }
}

expose(ImageProcessor);
