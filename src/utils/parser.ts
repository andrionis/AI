import * as cheerio from 'cheerio';
import { TextElement, ImageElement, SlideElement, TextStyle } from '../types';

/**
 * HTML解析器类
 */
export class HtmlParser {
  private $: cheerio.CheerioAPI;

  constructor(html: string) {
    this.$ = cheerio.load(html);
  }

  /**
   * 解析HTML并提取元素
   */
  public parseElements(): SlideElement[] {
    const elements: SlideElement[] = [];

    // 提取标题
    this.$('h1, h2, h3, h4, h5, h6').each((i, elem) => {
      const $elem = this.$(elem);
      const tagName = elem.tagName.toLowerCase();
      const fontSize = this.getFontSizeForHeading(tagName);

      elements.push({
        type: 'text',
        content: $elem.text().trim(),
        style: {
          fontSize,
          bold: true,
          align: 'center',
          ...this.extractStyles($elem)
        }
      });
    });

    // 提取段落
    this.$('p').each((i, elem) => {
      const $elem = this.$(elem);
      const text = $elem.text().trim();

      if (text) {
        elements.push({
          type: 'text',
          content: text,
          style: {
            fontSize: 14,
            align: 'left',
            ...this.extractStyles($elem)
          }
        });
      }
    });

    // 提取列表项
    this.$('li').each((i, elem) => {
      const $elem = this.$(elem);
      const text = $elem.text().trim();

      if (text) {
        elements.push({
          type: 'text',
          content: '• ' + text,
          style: {
            fontSize: 14,
            align: 'left',
            ...this.extractStyles($elem)
          }
        });
      }
    });

    // 提取图片
    this.$('img').each((i, elem) => {
      const $elem = this.$(elem);
      const src = $elem.attr('src');

      if (src) {
        elements.push({
          type: 'image',
          src: src,
          alt: $elem.attr('alt')
        });
      }
    });

    // 提取强调文本
    this.$('strong, b').each((i, elem) => {
      const $elem = this.$(elem);
      const text = $elem.text().trim();

      // 避免重复，只添加独立的强调文本
      if (text && !$elem.parent().is('p, li, h1, h2, h3, h4, h5, h6')) {
        elements.push({
          type: 'text',
          content: text,
          style: {
            fontSize: 14,
            bold: true,
            ...this.extractStyles($elem)
          }
        });
      }
    });

    return elements;
  }

  /**
   * 提取元素样式
   */
  private extractStyles($elem: cheerio.Cheerio<any>): Partial<TextStyle> {
    const style: Partial<TextStyle> = {};

    // 从style属性提取
    const styleAttr = $elem.attr('style');
    if (styleAttr) {
      const styles = this.parseStyleAttribute(styleAttr);

      if (styles.color) {
        style.color = styles.color;
      }
      if (styles.fontSize) {
        style.fontSize = parseInt(styles.fontSize);
      }
      if (styles.fontFamily) {
        style.fontFace = styles.fontFamily;
      }
      if (styles.fontWeight === 'bold' || parseInt(styles.fontWeight || '0') >= 600) {
        style.bold = true;
      }
      if (styles.fontStyle === 'italic') {
        style.italic = true;
      }
      if (styles.textAlign) {
        style.align = styles.textAlign as 'left' | 'center' | 'right';
      }
    }

    return style;
  }

  /**
   * 解析style属性字符串
   */
  private parseStyleAttribute(styleStr: string): Record<string, string> {
    const styles: Record<string, string> = {};

    styleStr.split(';').forEach(rule => {
      const [key, value] = rule.split(':').map(s => s.trim());
      if (key && value) {
        // 转换为驼峰命名
        const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        styles[camelKey] = value;
      }
    });

    return styles;
  }

  /**
   * 根据标题标签获取字体大小
   */
  private getFontSizeForHeading(tag: string): number {
    const sizeMap: Record<string, number> = {
      h1: 32,
      h2: 28,
      h3: 24,
      h4: 20,
      h5: 18,
      h6: 16
    };

    return sizeMap[tag] || 16;
  }

  /**
   * 提取所有文本内容
   */
  public extractText(): string {
    return this.$('body').text().trim();
  }

  /**
   * 提取标题
   */
  public extractTitle(): string | undefined {
    return this.$('title').text().trim() || this.$('h1').first().text().trim() || undefined;
  }
}
