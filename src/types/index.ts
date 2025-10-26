/**
 * 颜色类型
 */
export interface Color {
  r: number;
  g: number;
  b: number;
  a?: number;
}

/**
 * 文本样式
 */
export interface TextStyle {
  fontSize?: number;
  fontFace?: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  align?: 'left' | 'center' | 'right';
}

/**
 * 元素位置和尺寸
 */
export interface ElementBounds {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * 文本元素
 */
export interface TextElement {
  type: 'text';
  content: string;
  style: TextStyle;
  bounds?: ElementBounds;
}

/**
 * 图片元素
 */
export interface ImageElement {
  type: 'image';
  src: string;
  bounds?: ElementBounds;
  alt?: string;
}

/**
 * 形状元素
 */
export interface ShapeElement {
  type: 'shape';
  shapeType: 'rect' | 'circle' | 'line';
  bounds: ElementBounds;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

/**
 * PPT元素联合类型
 */
export type SlideElement = TextElement | ImageElement | ShapeElement;

/**
 * 幻灯片
 */
export interface Slide {
  elements: SlideElement[];
  background?: string;
}

/**
 * 转换器选项
 */
export interface ConverterOptions {
  title?: string;
  author?: string;
  subject?: string;
  slideWidth?: number;
  slideHeight?: number;
  defaultFontSize?: number;
  defaultFontFace?: string;
}
