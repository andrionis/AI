/**
 * HTML/图片转PPT转换器
 * 主入口文件
 */

export { HtmlToPptConverter } from './converters/htmlConverter';
export { ImageToPptConverter } from './converters/imageConverter';
export { HtmlParser } from './utils/parser';

export * from './types';

// 便捷函数
import { HtmlToPptConverter } from './converters/htmlConverter';
import { ImageToPptConverter } from './converters/imageConverter';
import { ConverterOptions } from './types';
import PptxGenJS from 'pptxgenjs';

/**
 * 快速将HTML转换为PPT文件
 */
export async function htmlToPpt(
  html: string,
  outputPath: string,
  options?: ConverterOptions
): Promise<void> {
  const converter = new HtmlToPptConverter(options);
  await converter.convertFromHtml(html);
  await converter.save(outputPath);
}

/**
 * 快速将图片转换为PPT文件
 */
export async function imageToPpt(
  imagePath: string | string[],
  outputPath: string,
  options?: ConverterOptions
): Promise<void> {
  const converter = new ImageToPptConverter(options);

  if (Array.isArray(imagePath)) {
    await converter.convertFromImages(imagePath);
  } else {
    await converter.convertFromImage(imagePath);
  }

  await converter.save(outputPath);
}

/**
 * 从HTML获取PPT对象（用于进一步自定义）
 */
export async function createPptFromHtml(
  html: string,
  options?: ConverterOptions
): Promise<PptxGenJS> {
  const converter = new HtmlToPptConverter(options);
  return await converter.convertFromHtml(html);
}

/**
 * 从图片获取PPT对象（用于进一步自定义）
 */
export async function createPptFromImage(
  imagePath: string | string[],
  options?: ConverterOptions
): Promise<PptxGenJS> {
  const converter = new ImageToPptConverter(options);

  if (Array.isArray(imagePath)) {
    return await converter.convertFromImages(imagePath);
  } else {
    return await converter.convertFromImage(imagePath);
  }
}
