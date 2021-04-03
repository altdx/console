export type ModifierType =
  | "reset"
  | "bold"
  | "dim"
  | "italic"
  | "underline"
  | "inverse"
  | "hidden"
  | "strikethrough";
export type ColorType =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white"
  | "gray";

/**
 * Altdx Console Style interface.
 * This interface allows you to style terminal output.
 */
export interface IConsoleStyle {
  /**
   * Renders styled text.
   *
   * @param text - Text to styled.
   * @returns The styled text.
   */
  render: (text: string) => string;

  /**
   * Reset style.
   */
  reset: () => IConsoleStyle;

  /**
   * Bold.
   */
  bold: () => IConsoleStyle;

  /**
   * Dim.
   */
  dim: () => IConsoleStyle;

  /**
   * Italic.
   */
  italic: () => IConsoleStyle;

  /**
   * Underline.
   */
  underline: () => IConsoleStyle;

  /**
   * Inverse.
   */
  inverse: () => IConsoleStyle;

  /**
   * Hidden.
   */
  hidden: () => IConsoleStyle;

  /**
   * Strike through.
   */
  strikethrough: () => IConsoleStyle;

  /**
   * Applies text color.
   *
   * @param color - Color of text.
   * @param light - Set true for light color.
   */
  color: (color: ColorType | null, light?: boolean) => IConsoleStyle;

  /**
   * Applies text background color.
   *
   * @param color - Background color of text.
   * @param light - Set true for light color.
   */
  bgc: (color: ColorType | null, light?: boolean) => IConsoleStyle;
}
