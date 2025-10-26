import PptxGenJS from 'pptxgenjs';
import { HtmlParser } from '../utils/parser';
import { ConverterOptions, SlideElement, TextElement, ImageElement } from '../types';

/**
 * HTML转PPT转换器
 */
export class HtmlToPptConverter {
  private pptx: PptxGenJS;
  private options: ConverterOptions;

  constructor(options: ConverterOptions = {}) {
    this.pptx = new PptxGenJS();
    this.options = {
      slideWidth: 10,
      slideHeight: 5.625,
      defaultFontSize: 14,
      defaultFontFace: 'Arial',
      ...options
    };

    // 设置PPT属性
    this.pptx.layout = 'LAYOUT_16x9';
    this.pptx.author = this.options.author || 'HTML to PPT Converter';
    this.pptx.title = this.options.title || 'Converted Presentation';
    this.pptx.subject = this.options.subject || 'Generated from HTML';
  }

  /**
   * 从HTML字符串转换
   */
  public async convertFromHtml(html: string): Promise<PptxGenJS> {
    const parser = new HtmlParser(html);
    const elements = parser.parseElements();

    // 如果没有标题，从HTML提取
    if (!this.options.title) {
      const title = parser.extractTitle();
      if (title) {
        this.pptx.title = title;
      }
    }

    // 将元素分组为幻灯片
    const slides = this.groupElementsIntoSlides(elements);

    // 创建幻灯片
    for (const slideElements of slides) {
      await this.createSlide(slideElements);
    }

    return this.pptx;
  }

  /**
   * 将元素分组为幻灯片
   * 每个标题（h1-h3）开始一个新幻灯片
   */
  private groupElementsIntoSlides(elements: SlideElement[]): SlideElement[][] {
    const slides: SlideElement[][] = [];
    let currentSlide: SlideElement[] = [];

    for (const element of elements) {
      if (element.type === 'text') {
        const textElement = element as TextElement;

        // 大标题（>=24pt）开始新幻灯片
        if (textElement.style.fontSize && textElement.style.fontSize >= 24) {
          if (currentSlide.length > 0) {
            slides.push(currentSlide);
          }
          currentSlide = [element];
        } else {
          currentSlide.push(element);
        }
      } else {
        currentSlide.push(element);
      }

      // 限制每个幻灯片的元素数量
      if (currentSlide.length >= 8) {
        slides.push(currentSlide);
        currentSlide = [];
      }
    }

    if (currentSlide.length > 0) {
      slides.push(currentSlide);
    }

    // 如果没有幻灯片，创建一个空幻灯片
    if (slides.length === 0) {
      slides.push([]);
    }

    return slides;
  }

  /**
   * 创建单个幻灯片
   */
  private async createSlide(elements: SlideElement[]): Promise<void> {
    const slide = this.pptx.addSlide();

    let yPosition = 0.5; // 起始Y位置（英寸）

    for (const element of elements) {
      if (element.type === 'text') {
        const textElement = element as TextElement;
        const height = this.calculateTextHeight(textElement);

        // 检查是否需要换页
        if (yPosition + height > this.options.slideHeight! - 0.5) {
          break; // 当前幻灯片已满，剩余元素将在下一个幻灯片
        }

        slide.addText(textElement.content, {
          x: 0.5,
          y: yPosition,
          w: this.options.slideWidth! - 1,
          h: height,
          fontSize: textElement.style.fontSize || this.options.defaultFontSize,
          fontFace: textElement.style.fontFace || this.options.defaultFontFace,
          color: this.convertColor(textElement.style.color),
          bold: textElement.style.bold || false,
          italic: textElement.style.italic || false,
          underline: textElement.style.underline ? { style: 'sng' } : undefined,
          align: textElement.style.align || 'left',
          valign: 'top'
        });

        yPosition += height + 0.2; // 添加间距
      } else if (element.type === 'image') {
        const imageElement = element as ImageElement;

        try {
          // 默认图片尺寸
          const imageWidth = imageElement.bounds?.w || 4;
          const imageHeight = imageElement.bounds?.h || 3;

          // 检查是否需要换页
          if (yPosition + imageHeight > this.options.slideHeight! - 0.5) {
            break;
          }

          slide.addImage({
            path: imageElement.src,
            x: (this.options.slideWidth! - imageWidth) / 2,
            y: yPosition,
            w: imageWidth,
            h: imageHeight
          });

          yPosition += imageHeight + 0.3;
        } catch (error) {
          console.warn(`Failed to add image: ${imageElement.src}`, error);
        }
      }
    }
  }

  /**
   * 计算文本高度
   */
  private calculateTextHeight(element: TextElement): number {
    const fontSize = element.style.fontSize || this.options.defaultFontSize || 14;
    const lineCount = Math.ceil(element.content.length / 80) || 1; // 粗略估算行数

    // 根据字体大小和行数估算高度（英寸）
    return (fontSize * lineCount * 1.2) / 72; // 72点 = 1英寸
  }

  /**
   * 转换颜色格式
   */
  private convertColor(color?: string): string {
    if (!color) {
      return '000000';
    }

    // 移除 # 号
    if (color.startsWith('#')) {
      return color.substring(1);
    }

    // 处理 rgb() 格式
    if (color.startsWith('rgb')) {
      const matches = color.match(/\d+/g);
      if (matches && matches.length >= 3) {
        const r = parseInt(matches[0]).toString(16).padStart(2, '0');
        const g = parseInt(matches[1]).toString(16).padStart(2, '0');
        const b = parseInt(matches[2]).toString(16).padStart(2, '0');
        return r + g + b;
      }
    }

    return color;
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
