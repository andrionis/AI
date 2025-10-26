import PptxGenJS from 'pptxgenjs';
import sharp from 'sharp';
import { ConverterOptions } from '../types';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 图片转PPT转换器
 */
export class ImageToPptConverter {
  private pptx: PptxGenJS;
  private options: ConverterOptions;

  constructor(options: ConverterOptions = {}) {
    this.pptx = new PptxGenJS();
    this.options = {
      slideWidth: 10,
      slideHeight: 5.625,
      ...options
    };

    // 设置PPT属性
    this.pptx.layout = 'LAYOUT_16x9';
    this.pptx.author = this.options.author || 'Image to PPT Converter';
    this.pptx.title = this.options.title || 'Image Presentation';
    this.pptx.subject = this.options.subject || 'Generated from Images';
  }

  /**
   * 从单个图片文件转换
   */
  public async convertFromImage(imagePath: string): Promise<PptxGenJS> {
    await this.addImageSlide(imagePath);
    return this.pptx;
  }

  /**
   * 从多个图片文件转换
   */
  public async convertFromImages(imagePaths: string[]): Promise<PptxGenJS> {
    for (const imagePath of imagePaths) {
      await this.addImageSlide(imagePath);
    }
    return this.pptx;
  }

  /**
   * 添加图片幻灯片
   */
  private async addImageSlide(imagePath: string): Promise<void> {
    try {
      // 检查文件是否存在
      if (!fs.existsSync(imagePath)) {
        throw new Error(`Image file not found: ${imagePath}`);
      }

      // 获取图片元数据
      const metadata = await sharp(imagePath).metadata();
      const imageWidth = metadata.width || 1920;
      const imageHeight = metadata.height || 1080;

      // 计算适应幻灯片的尺寸
      const slideWidthPx = this.options.slideWidth! * 96; // 英寸转像素（96 DPI）
      const slideHeightPx = this.options.slideHeight! * 96;

      let targetWidth = imageWidth;
      let targetHeight = imageHeight;

      // 按比例缩放以适应幻灯片
      const widthRatio = slideWidthPx / imageWidth;
      const heightRatio = slideHeightPx / imageHeight;
      const scale = Math.min(widthRatio, heightRatio, 1); // 不放大，只缩小

      targetWidth = imageWidth * scale;
      targetHeight = imageHeight * scale;

      // 转换回英寸
      const widthInInches = targetWidth / 96;
      const heightInInches = targetHeight / 96;

      // 居中位置
      const x = (this.options.slideWidth! - widthInInches) / 2;
      const y = (this.options.slideHeight! - heightInInches) / 2;

      // 创建幻灯片并添加图片
      const slide = this.pptx.addSlide();

      slide.addImage({
        path: imagePath,
        x: Math.max(0, x),
        y: Math.max(0, y),
        w: widthInInches,
        h: heightInInches
      });

      // 可选：添加图片文件名作为标题
      const fileName = path.basename(imagePath, path.extname(imagePath));
      slide.addText(fileName, {
        x: 0.5,
        y: this.options.slideHeight! - 0.6,
        w: this.options.slideWidth! - 1,
        h: 0.4,
        fontSize: 12,
        color: '666666',
        align: 'center',
        valign: 'middle'
      });
    } catch (error) {
      console.error(`Failed to add image slide for: ${imagePath}`, error);
      throw error;
    }
  }

  /**
   * 从图片Buffer转换
   */
  public async convertFromBuffer(
    imageBuffer: Buffer,
    title?: string
  ): Promise<PptxGenJS> {
    const slide = this.pptx.addSlide();

    try {
      // 获取图片元数据
      const metadata = await sharp(imageBuffer).metadata();
      const imageWidth = metadata.width || 1920;
      const imageHeight = metadata.height || 1080;

      // 计算适应幻灯片的尺寸
      const slideWidthPx = this.options.slideWidth! * 96;
      const slideHeightPx = this.options.slideHeight! * 96;

      const widthRatio = slideWidthPx / imageWidth;
      const heightRatio = slideHeightPx / imageHeight;
      const scale = Math.min(widthRatio, heightRatio, 1);

      const targetWidth = (imageWidth * scale) / 96;
      const targetHeight = (imageHeight * scale) / 96;

      const x = (this.options.slideWidth! - targetWidth) / 2;
      const y = (this.options.slideHeight! - targetHeight) / 2;

      // 转换buffer为base64
      const base64Image = `data:image/${metadata.format};base64,${imageBuffer.toString('base64')}`;

      slide.addImage({
        data: base64Image,
        x: Math.max(0, x),
        y: Math.max(0, y),
        w: targetWidth,
        h: targetHeight
      });

      // 添加标题（如果提供）
      if (title) {
        slide.addText(title, {
          x: 0.5,
          y: this.options.slideHeight! - 0.6,
          w: this.options.slideWidth! - 1,
          h: 0.4,
          fontSize: 12,
          color: '666666',
          align: 'center',
          valign: 'middle'
        });
      }
    } catch (error) {
      console.error('Failed to convert image buffer', error);
      throw error;
    }

    return this.pptx;
  }

  /**
   * 保存PPT文件
   */
  public async save(filename: string): Promise<void> {
    await this.pptx.writeFile({ fileName: filename });
  }

  /**
   * 获取PPT对象
   */
  public getPptx(): PptxGenJS {
    return this.pptx;
  }
}
